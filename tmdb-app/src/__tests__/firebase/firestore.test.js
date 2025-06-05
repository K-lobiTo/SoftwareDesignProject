import {
  addUser,
  addMovieToUser,
  removeMovieFromUser,
  getMoviesByUser,
} from "../../firebase/firestore";

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  return {
    ...originalModule,
    doc: jest.fn((db, collection, id) => ({ db, collection, id })),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    arrayUnion: jest.fn((element) => `arrayUnion:${element}`),
    arrayRemove: jest.fn((element) => `arrayRemove:${element}`),
    getDoc: jest.fn(),
  };
});

jest.mock("../../firebase/firebase", () => ({
  db: "mock-database",
}));

const {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} = require("firebase/firestore");

describe("firestore functions", () => {
  const mockUserData = {
    uid: "test-uid",
    email: "test@example.com",
  };

  const mockUserDataNoEmail = {
    uid: "test-uid-2",
  };

  const mockMovieId = "movie-123";
  const mockMovieId2 = "movie-456";
  const invalidMovieId = null;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addUser", () => {
    it("should add a new user with required fields", async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });
      await addUser(mockUserData);

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        {
          userJSON: { uid: mockUserData.uid, email: mockUserData.email },
          movies: [],
        },
        { merge: false }
      );
    });

    it("should handle user without email", async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });
      await addUser(mockUserDataNoEmail);

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        {
          userJSON: { uid: mockUserDataNoEmail.uid },
          movies: [],
        },
        { merge: false }
      );
    });

    it("should not overwrite existing user", async () => {
      getDoc.mockResolvedValueOnce({ exists: () => true });
      await addUser(mockUserData);
      expect(setDoc).not.toHaveBeenCalled();
    });

    it("should handle empty user data", async () => {
      console.error = jest.fn();
      await addUser({});
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle missing uid", async () => {
      console.error = jest.fn();
      await addUser({ email: "test@example.com" });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("addMovieToUser", () => {
    it("should add single movie to empty array", async () => {
      await addMovieToUser(mockUserData, mockMovieId);
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
        movies: `arrayUnion:${mockMovieId}`,
      });
    });

    it("should add multiple movies sequentially", async () => {
      await addMovieToUser(mockUserData, mockMovieId);
      await addMovieToUser(mockUserData, mockMovieId2);

      expect(updateDoc).toHaveBeenCalledTimes(2);
      expect(updateDoc).toHaveBeenNthCalledWith(2, expect.anything(), {
        movies: `arrayUnion:${mockMovieId2}`,
      });
    });

    it("should not duplicate existing movie", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: [mockMovieId] }),
      });

      await addMovieToUser(mockUserData, mockMovieId);
      expect(updateDoc).toHaveBeenCalled();
    });

    it("should handle invalid movie ID", async () => {
      console.error = jest.fn();
      await expect(addMovieToUser(mockUserData, null)).rejects.toThrow(
        "Invalid movie ID"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error adding movie to user:",
        expect.any(Error)
      );
    });

    it("should handle missing user data", async () => {
      console.error = jest.fn();
      await expect(addMovieToUser(null, mockMovieId)).rejects.toThrow(
        "Invalid user data"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error adding movie to user:",
        expect.any(Error)
      );
    });
  });

  describe("removeMovieFromUser", () => {
    it("should remove existing movie", async () => {
      await removeMovieFromUser(mockUserData, mockMovieId);
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
        movies: `arrayRemove:${mockMovieId}`,
      });
    });

    it("should handle removing non-existent movie", async () => {
      await removeMovieFromUser(mockUserData, "non-existent-movie");
      expect(updateDoc).toHaveBeenCalled(); // Still attempts removal
    });

    it("should handle removing from empty movie list", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: [] }),
      });

      await removeMovieFromUser(mockUserData, mockMovieId);
      expect(updateDoc).toHaveBeenCalled();
    });

    it("should handle invalid movie ID", async () => {
      console.error = jest.fn();
      await expect(removeMovieFromUser(mockUserData, null)).rejects.toThrow(
        "Invalid movie ID"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error removing movie from user:",
        expect.any(Error)
      );
    });

    it("should handle missing user data", async () => {
      console.error = jest.fn();
      await expect(removeMovieFromUser(null, mockMovieId)).rejects.toThrow(
        "Invalid user data"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error removing movie from user:",
        expect.any(Error)
      );
    });
  });

  describe("getMoviesByUser", () => {
    beforeEach(() => {
      getDoc.mockReset();
    });

    it("should return empty array for new user", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: [] }),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual([]);
    });

    it("should return multiple movies", async () => {
      const mockMovies = [mockMovieId, mockMovieId2];
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: mockMovies }),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual(mockMovies);
    });

    it("should handle missing movies field", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({}),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual([]);
    });

    it("should handle non-array movies field", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: "not-an-array" }),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual([]);
    });

    it("should handle non-existent user", async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => false,
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual([]);
    });

    it("should log and rethrow Firestore errors", async () => {
      const mockError = new Error("Firestore connection failed");
      getDoc.mockRejectedValueOnce(mockError);
      console.error = jest.fn();

      await expect(getMoviesByUser(mockUserData)).rejects.toThrow(mockError);

      expect(console.error).toHaveBeenCalledWith(
        "Error fetching movies for user:",
        mockError
      );
    });

    it("should handle error when userData is invalid", async () => {
      const mockError = new Error("Invalid user data");
      console.error = jest.fn();

      await expect(getMoviesByUser(null)).rejects.toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Integration Scenarios", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should maintain movie list integrity through add/remove", async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });
      await addUser(mockUserData);

      getDoc.mockResolvedValue({ exists: () => true });
      await addMovieToUser(mockUserData, mockMovieId);
      await addMovieToUser(mockUserData, mockMovieId2);
      await removeMovieFromUser(mockUserData, mockMovieId);

      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: [mockMovieId2] }),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result).toEqual([mockMovieId2]);
    });

    it("should handle concurrent movie additions", async () => {
      getDoc.mockResolvedValue({ exists: () => true });

      await Promise.all([
        addMovieToUser(mockUserData, mockMovieId),
        addMovieToUser(mockUserData, mockMovieId2),
      ]);

      expect(updateDoc).toHaveBeenCalledTimes(2);
    });

    it("should handle rapid add/remove of same movie", async () => {
      await addMovieToUser(mockUserData, mockMovieId);
      await removeMovieFromUser(mockUserData, mockMovieId);
      await addMovieToUser(mockUserData, mockMovieId);

      expect(updateDoc).toHaveBeenCalledTimes(3);
    });

    it("should handle malformed movie IDs", async () => {
      console.error = jest.fn();

      // Test empty string
      await expect(addMovieToUser(mockUserData, "")).rejects.toThrow(
        "Invalid movie ID"
      );

      // Test non-string ID
      await expect(
        addMovieToUser(mockUserData, { not: "a string" })
      ).rejects.toThrow("Invalid movie ID");

      expect(console.error).toHaveBeenCalledTimes(2);
    });

    it("should handle user with maximum movies (stress test)", async () => {
      const maxMovies = Array(1000)
        .fill()
        .map((_, i) => `movie-${i}`);
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ movies: maxMovies }),
      });

      const result = await getMoviesByUser(mockUserData);
      expect(result.length).toBe(1000);
    });
  });
});
