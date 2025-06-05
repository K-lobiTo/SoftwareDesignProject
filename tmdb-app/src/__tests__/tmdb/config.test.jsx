import {
    config,
    tmdb,
    searchMovies,
    getGenres,
    getMovieById,
    getMoviesByGenre,
    getAllMovies,
    fetchMovieCredits,
    fetchMovieVideos,
    fetchMovieData,
} from "../../tmdb/config";

describe("config", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should return the correct API key", () => {
        expect(config.apiKey).toBe("92d41915c8b82a1b47b517889544058c");
    });

    it("should return the correct base URL", () => {
        expect(config.baseURL).toBe("https://api.themoviedb.org/3");
    });

    it("creates axios instance", () => {
        expect(tmdb).toBeDefined();
    });

    describe("searchMovies", () => {
        const mockQuery = "test";
        const mockLanguage = "en-US";
        const mockPage = 1;
        const mockGenderId = 1;

        it("should return an array of movies", async () => {
            const response = await searchMovies(
                mockQuery,
                mockLanguage,
                mockPage,
                mockGenderId,
            );
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("getGenres", () => {
        const mockLanguage = "en-US";

        it("should return an array of genres", async () => {
            const response = await getGenres(mockLanguage);
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("getMovieById", () => {
        const mockId = 123;

        it("should return a movie object", async () => {
            const response = await getMovieById(mockId);
            expect(response).toBeInstanceOf(Object);
        });
    });

    describe("getMoviesByGenre", () => {
        const mockGenreId = 123;

        it("should return an array of movies", async () => {
            const response = await getMoviesByGenre(mockGenreId);
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("getAllMovies", () => {
        const mockLanguage = "en-US";
        const mockPage = 1;

        it("should return an array of movies", async () => {
            const response = await getAllMovies(mockLanguage, mockPage);
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("fetchMovieCredits", () => {
        const mockId = 123;

        it("should return an array of credits", async () => {
            const response = await fetchMovieCredits(mockId);
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("fetchMovieVideos", () => {
        const mockId = 123;

        it("should return an array of videos", async () => {
            const response = await fetchMovieVideos(mockId);
            expect(response).toBeInstanceOf(Array);
        });
    });

    describe("fetchMovieData", () => {
        const mockId = 123;

        it("should return a movie object", async () => {
            const response = await fetchMovieData(mockId);
            expect(response).toBeInstanceOf(Object);
        });
    });
});
