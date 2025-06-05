import * as tmdb from "../../tmdb/config";
import axios from "axios";

describe("config", () => {
    beforeEach(() => {
        mockGet = jest.spyOn(tmdb.tmdb, "get");
        mockAxiosGet = jest.spyOn(axios, "get");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should have correct config", () => {
        expect(tmdb.config.apiKey).toBe("92d41915c8b82a1b47b517889544058c");
        expect(tmdb.config.baseURL).toBe("https://api.themoviedb.org/3");
    });

    describe("searchMovies", () => {
        beforeEach(() => {
            consoleSpy = jest
                .spyOn(console, "error")
                .mockImplementation(() => {});
        });

        describe("Basic Functionality", () => {
            it("should make correct API call with query parameters", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [{ id: 1, title: "Test Movie" }],
                        total_pages: 1,
                    },
                });
                await tmdb.searchMovies("query", "en-US", 2, "28");
                expect(mockGet).toHaveBeenCalledWith("/search/movie", {
                    params: {
                        api_key: tmdb.config.apiKey,
                        query: "query",
                        language: "en-US",
                        page: 2,
                    },
                });
            });
            it("should transform API response correctly", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [
                            {
                                id: 1,
                                title: "Test Movie",
                                release_date: "2023-01-01",
                                vote_average: 7.5,
                                poster_path: "/test.jpg",
                            },
                        ],
                        total_pages: 3,
                    },
                });
                const response = await tmdb.searchMovies(
                    "query",
                    "en-US",
                    1,
                    "",
                );
                expect(response).toEqual([
                    [
                        {
                            id: 1,
                            title: "Test Movie",
                            release: "2023-01-01",
                            punctuation: 7.5,
                            posterPath:
                                "https://image.tmdb.org/t/p/w500/test.jpg",
                        },
                    ],
                    3,
                ]);
            });
        });

        describe("Edge Cases", () => {
            it("should handle missing properties in API response", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [
                            {
                                id: 1,
                                title: "Minimal Movie",
                            },
                        ],
                        total_pages: 1,
                    },
                });

                const response = await tmdb.searchMovies(
                    "query",
                    "en-US",
                    1,
                    "",
                );
                expect(response[0][0]).toEqual({
                    id: 1,
                    title: "Minimal Movie",
                    release: undefined,
                    punctuation: undefined,
                    posterPath: "https://image.tmdb.org/t/p/w500undefined",
                });
            });
        });

        describe("Branch Coverage", () => {
            it("should call getAllMovies when both query and genderId are empty", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [{ id: 1, title: "All Movies" }],
                        total_pages: 1,
                    },
                });

                await tmdb.searchMovies("", "en-US", 1, "");
                expect(mockGet).toHaveBeenCalledWith(
                    "/discover/movie",
                    expect.any(Object),
                );
            });

            it("should not call getAllMovies when query is present", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [],
                        total_pages: 0,
                    },
                });

                await tmdb.searchMovies("query", "en-US", 1, "");
                expect(mockGet).not.toHaveBeenCalledWith(
                    "/discover/movie",
                    expect.any(Object),
                );
            });

            it("should not call getAllMovies when genderId is present", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [],
                        total_pages: 0,
                    },
                });

                await tmdb.searchMovies("", "en-US", 1, "28");
                expect(mockGet).not.toHaveBeenCalledWith(
                    "/discover/movie",
                    expect.any(Object),
                );
            });
        });

        describe("Error Handling", () => {
            it("should handle malformed API responses", async () => {
                mockGet.mockResolvedValue({
                    data: null,
                });

                await expect(
                    tmdb.searchMovies("query", "en-US", 1, ""),
                ).rejects.toThrow();
            });
        });
    });

    describe("getGenres", () => {
        const mockLanguage = "en-US";

        describe("Basic Functionality", () => {
            it("should fetch genres successfully", async () => {
                const mockGenres = [
                    { id: 28, name: "Action" },
                    { id: 35, name: "Comedy" },
                ];

                mockGet.mockResolvedValueOnce({
                    data: { genres: mockGenres },
                });

                const result = await tmdb.getGenres(mockLanguage);

                expect(mockGet).toHaveBeenCalledWith("/genre/movie/list", {
                    params: {
                        api_key: tmdb.config.apiKey,
                        language: mockLanguage,
                    },
                });
                expect(result).toEqual(mockGenres);
            });

            it("should pass correct parameters", async () => {
                mockGet.mockResolvedValueOnce({
                    data: { genres: [] },
                });

                await tmdb.getGenres(mockLanguage);

                expect(mockGet).toHaveBeenCalledWith("/genre/movie/list", {
                    params: expect.objectContaining({
                        api_key: tmdb.config.apiKey,
                        language: mockLanguage,
                    }),
                });
            });
        });

        describe("Error Handling", () => {
            it("should handle API errors gracefully", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                mockGet.mockRejectedValueOnce(new Error("API Error"));

                await expect(tmdb.getGenres(mockLanguage)).rejects.toThrow(
                    "API Error",
                );
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error fetching genres:",
                    expect.any(Error),
                );
                consoleSpy.mockRestore();
            });
        });
    });

    describe("getMovieById", () => {
        const mockMovieId = 123;
        const mockLanguage = "en-US";

        beforeEach(() => {
            jest.spyOn(axios, "get").mockClear();
        });

        describe("Basic Functionality", () => {
            it("should handle different languages", async () => {
                const frenchLanguage = "fr-FR";
                axios.get.mockResolvedValueOnce({ data: {} });

                await tmdb.getMovieById(mockMovieId, frenchLanguage);

                expect(axios.get).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.objectContaining({
                        params: expect.objectContaining({
                            language: frenchLanguage,
                        }),
                    }),
                );
            });
        });

        describe("Error Handling", () => {
            it("should handle API errors gracefully", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                axios.get.mockRejectedValueOnce(new Error("Movie not found"));

                await expect(
                    tmdb.getMovieById(mockMovieId, mockLanguage),
                ).rejects.toThrow("Movie not found");
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error fetching movie:",
                    expect.any(Error),
                );
                consoleSpy.mockRestore();
            });
        });
    });

    describe("getMoviesByGenre", () => {
        const mockGenreId = "28";
        const mockLanguage = "en-US";
        const mockPage = 1;

        describe("Basic Functionality", () => {
            it("should fetch movies by genre successfully", async () => {
                const mockResponse = {
                    data: {
                        results: [
                            {
                                id: 1,
                                title: "Action Movie",
                                release_date: "2023-01-01",
                                vote_average: 8.5,
                                poster_path: "/poster1.jpg",
                            },
                        ],
                        total_pages: 10,
                    },
                };

                mockGet.mockResolvedValueOnce(mockResponse);

                const [movies, totalPages] = await tmdb.getMoviesByGenre(
                    mockGenreId,
                    mockLanguage,
                    mockPage,
                );

                expect(mockGet).toHaveBeenCalledWith("/discover/movie", {
                    params: {
                        api_key: tmdb.config.apiKey,
                        with_genres: mockGenreId,
                        language: mockLanguage,
                        page: mockPage,
                    },
                });

                expect(movies).toHaveLength(1);
                expect(movies[0]).toEqual({
                    id: 1,
                    title: "Action Movie",
                    release: "2023-01-01",
                    punctuation: 8.5,
                    posterPath: "https://image.tmdb.org/t/p/w500/poster1.jpg",
                });
                expect(totalPages).toBe(10);
            });
        });

        describe("Branch Coverage", () => {
            it("should limit total pages to 500 when response exceeds limit", async () => {
                mockGet.mockResolvedValueOnce({
                    data: {
                        results: [],
                        total_pages: 1000,
                    },
                });

                const [, totalPages] = await tmdb.getMoviesByGenre(
                    mockGenreId,
                    mockLanguage,
                    mockPage,
                );
                expect(totalPages).toBe(500);
            });
        });

        describe("Error Handling", () => {
            it("should handle API errors gracefully", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                mockGet.mockRejectedValueOnce(new Error("Genre not found"));

                await expect(
                    tmdb.getMoviesByGenre(mockGenreId, mockLanguage, mockPage),
                ).rejects.toThrow("Genre not found");
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error fetching movies by genre:",
                    expect.any(Error),
                );
                consoleSpy.mockRestore();
            });
        });
    });

    describe("getAllMovies", () => {
        const mockLanguage = "en-US";
        const mockPage = 1;

        describe("Branch Coverage", () => {
            it("should limit total pages to 500 when response exceeds limit", async () => {
                mockGet.mockResolvedValueOnce({
                    data: {
                        results: [],
                        total_pages: 600,
                    },
                });

                const [, totalPages] = await tmdb.getAllMovies(
                    mockLanguage,
                    mockPage,
                );
                expect(totalPages).toBe(500);
            });
        });

        describe("Error Handling", () => {
            it("should handle API errors gracefully", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                mockGet.mockRejectedValueOnce(new Error("Server error"));

                await expect(
                    tmdb.getAllMovies(mockLanguage, mockPage),
                ).rejects.toThrow("Server error");
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error fetching all movies:",
                    expect.any(Error),
                );
                consoleSpy.mockRestore();
            });
        });
    });

    describe("fetchMovieCredits", () => {
        const mockMovieId = 123;
        const mockLanguage = "en-US";

        describe("Basic Functionality", () => {
            it("should fetch movie credits successfully", async () => {
                const mockResponse = {
                    data: {
                        cast: [
                            {
                                id: 1,
                                name: "Actor One",
                                character: "Hero",
                                known_for_department: "Acting",
                                profile_path: "/actor1.jpg",
                            },
                        ],
                    },
                };

                mockGet.mockResolvedValueOnce(mockResponse);

                const result = await tmdb.fetchMovieCredits(
                    mockMovieId,
                    mockLanguage,
                );

                expect(mockGet).toHaveBeenCalledWith(
                    `/movie/${mockMovieId}/credits`,
                    {
                        params: {
                            language: mockLanguage,
                        },
                    },
                );

                expect(result).toHaveLength(1);
                expect(result[0]).toEqual({
                    id: 1,
                    name: "Actor One",
                    character: "Hero",
                    profilePath: "https://image.tmdb.org/t/p/w500/actor1.jpg",
                });
            });
        });

        describe("Branch Coverage", () => {
            it("should handle actors without profile pictures", async () => {
                mockGet.mockResolvedValueOnce({
                    data: {
                        cast: [
                            {
                                id: 1,
                                name: "Actor",
                                character: "Role",
                                known_for_department: "Acting",
                                profile_path: null,
                            },
                        ],
                    },
                });

                const result = await tmdb.fetchMovieCredits(
                    mockMovieId,
                    mockLanguage,
                );
                expect(result[0].profilePath).toBe(
                    "https://i.imgflip.com/9au02y.jpg?a482136",
                );
            });
        });

        describe("Error Handling", () => {
            it("should return empty array on API error", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                mockGet.mockRejectedValueOnce(new Error("API Error"));

                const result = await tmdb.fetchMovieCredits(
                    mockMovieId,
                    mockLanguage,
                );
                expect(result).toEqual([]);
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Failed to fetch movie credits:",
                    expect.any(Error),
                );
                consoleSpy.mockRestore();
            });
        });
    });

    describe("fetchMovieVideos", () => {
        const mockMovieId = 123;
        const mockLanguage = "en-US";

        describe("Basic Functionality", () => {
            it("should fetch and filter YouTube videos", async () => {
                mockGet.mockResolvedValue({
                    data: {
                        results: [
                            { id: "1", site: "YouTube", type: "Trailer" },
                            { id: "2", site: "Vimeo", type: "Behind Scenes" },
                        ],
                    },
                });

                const result = await tmdb.fetchMovieVideos(
                    mockMovieId,
                    mockLanguage,
                );

                expect(mockGet).toHaveBeenCalledWith(
                    `https://api.themoviedb.org/3/movie/${mockMovieId}/videos`,
                    { params: { language: mockLanguage } },
                );
                expect(result).toEqual([
                    { id: "1", site: "YouTube", type: "Trailer" },
                ]);
            });
        });

        describe("Error Handling", () => {
            it("should return empty array on API error", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                mockGet.mockRejectedValue(new Error("API Error"));

                const result = await tmdb.fetchMovieVideos(
                    mockMovieId,
                    mockLanguage,
                );
                expect(result).toEqual([]);
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error fetching movie videos:",
                    expect.any(Error),
                );
            });
        });
    });

    describe("fetchMovieData", () => {
        const mockMovieId = 123;
        const mockLanguage = "en-US";

        describe("Basic Functionality", () => {
            it("should fetch movie data successfully", async () => {
                const mockData = { id: mockMovieId, title: "Test Movie" };
                mockGet.mockResolvedValue({ data: mockData });

                const result = await tmdb.fetchMovieData(
                    mockMovieId,
                    mockLanguage,
                );

                expect(mockGet).toHaveBeenCalledWith(`/movie/${mockMovieId}`, {
                    params: { language: mockLanguage },
                });
                expect(result).toEqual(mockData);
            });
        });

        describe("Error Handling", () => {
            it("should log and rethrow errors", async () => {
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {});
                const error = new Error("API Error");
                mockGet.mockRejectedValue(error);

                await expect(
                    tmdb.fetchMovieData(mockMovieId, mockLanguage),
                ).rejects.toThrow(error);
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Error al obtener los datos de la película:",
                    error.message,
                );
            });
        });
    });
});
