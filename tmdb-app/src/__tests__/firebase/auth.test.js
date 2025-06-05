import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth.js";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { addUser } from "../../firebase/firestore.js";
import { doSignOut } from "../../firebase/auth";
import { auth } from "../../firebase/firebase";
import { doPasswordChange } from "../../firebase/auth.js";
import { __mockUpdatePassword, __mockAuthInstance } from "firebase/auth";

jest.mock("firebase/auth", () => {
  const mockSignOut = jest.fn();
  const mockUpdatePassword = jest.fn();
  const mockCurrentUser = { uid: "123" };
  const mockAuthInstance = {
    currentUser: mockCurrentUser,
    signOut: mockSignOut,
  };

  return {
    getAuth: jest.fn(() => mockAuthInstance),
    createUserWithEmailAndPassword: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    updatePassword: mockUpdatePassword,
    __mockSignOut: mockSignOut,
    __mockUpdatePassword: mockUpdatePassword,
    __mockAuthInstance: mockAuthInstance,
  };
});

jest.mock("../../firebase/firestore.js", () => ({
  addUser: jest.fn(),
}));


describe("doPasswordChange", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls updatePassword with currentUser and new password", async () => {
    const newPassword = "newSecurePassword123";
    __mockUpdatePassword.mockResolvedValue();

    await doPasswordChange(newPassword);

    expect(__mockUpdatePassword).toHaveBeenCalledWith(__mockAuthInstance.currentUser, newPassword);
  });

  it("throws if updatePassword fails", async () => {
    const newPassword = "badpass";
    __mockUpdatePassword.mockRejectedValue(new Error("Weak password"));

    await expect(doPasswordChange(newPassword)).rejects.toThrow("Weak password");
  });
});

describe("doSignOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call auth.signOut", async () => {
    auth.signOut = jest.fn().mockResolvedValue();

    await doSignOut();

    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });

  it("should propagate error if signOut fails", async () => {
    const mockError = new Error("Sign-out failed");
    auth.signOut = jest.fn().mockRejectedValue(mockError);

    await expect(doSignOut()).rejects.toThrow("Sign-out failed");
  });
});

describe("doSignInWithGoogle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls signInWithPopup with auth and GoogleAuthProvider instance", async () => {
    const fakeUser = { uid: "123", email: "test@example.com" };
    const fakeResult = { user: fakeUser };
    signInWithPopup.mockResolvedValue(fakeResult);

    await doSignInWithGoogle();

    expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
    expect(addUser).toHaveBeenCalledWith(fakeUser);
  });

  it("propagates error when signInWithPopup fails", async () => {
    const error = new Error("Popup failed");
    signInWithPopup.mockRejectedValue(error);

    await expect(doSignInWithGoogle()).rejects.toThrow("Popup failed");

    expect(addUser).not.toHaveBeenCalled();
  });
});


describe("emailSignIn", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should throw error when email doesn't have @", async () => {
        const mockEmail = "testmail.com";
        const mockPassword = "password1234";

        const mockError = new Error("Email has no @ symbol");
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: Email has no @ symbol");
    });

    it("should throw error when email doesn't have a domain", async () => {
        const mockEmail = "testmail@something";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has no domain"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email doesn't have a name", async () => {
        const mockEmail = "@something.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has no name"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email doesn't have a domain name", async () => {
        const mockEmail = "test@.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has no domain name"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email doesn't have a domain name", async () => {
        const mockEmail = "test@.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has no domain name"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email doesn't have anything", async () => {
        const mockEmail = "";
        const mockPassword = "password1234";

        const mockErrorMessage = "Empty email"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email has spaces", async () => {
        const mockEmail = "test @ email.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email contains spaces"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email has special characters", async () => {
        const mockEmail = "tes^&t@email.com";
        const mockPassword = "wrongpass";

        const mockErrorMessage = "Email contains special characters"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when password is wrong", async () => {
        const mockEmail = "test@email.com";
        const mockPassword = "wrongpass";

        const mockErrorMessage = "Email or password is wrong"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when password is empty", async () => {
        const mockEmail = "test@email.com";
        const mockPassword = "wrongpass";

        const mockErrorMessage = "Password is empty"
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });
    it("should throw error when email is just whitespace", async () => {
        const mockEmail = "   ";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email is whitespace only";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email contains double dots", async () => {
        const mockEmail = "test..email@example.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email contains double dots";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email has trailing @", async () => {
        const mockEmail = "test@";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has trailing @";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email has unsupported TLD", async () => {
        const mockEmail = "test@example.invalidtld";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email has unsupported domain";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when email is too long", async () => {
        const mockEmail = "a".repeat(320) + "@example.com";
        const mockPassword = "password1234";

        const mockErrorMessage = "Email exceeds maximum length";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when password is too short", async () => {
        const mockEmail = "test@example.com";
        const mockPassword = "123";

        const mockErrorMessage = "Password is too short";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });

    it("should throw error when password contains spaces", async () => {
        const mockEmail = "test@example.com";
        const mockPassword = "pass word";

        const mockErrorMessage = "Password contains spaces";
        const mockError = new Error(mockErrorMessage);
        createUserWithEmailAndPassword.mockRejectedValue(mockError);

        await expect(doCreateUserWithEmailAndPassword(mockEmail, mockPassword))
        .rejects.toThrow("Error signing in: " + mockErrorMessage);
    });


});
