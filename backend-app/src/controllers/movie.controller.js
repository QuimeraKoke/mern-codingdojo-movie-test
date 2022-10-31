const { PrismaClient } = require('@prisma/client')

class MovieController {

    prisma = new PrismaClient();

    getMovies = (async (req, res) => {
        let movies = await this.prisma.movie.findMany({
            include: {
                review: {
                    include: {
                        user: {
                            select: {id: true, firstName: true, lastName: true, email: true}
                        }
                    }
                }
            }
        });
        return res.json({data: movies});
    });

    getMovie = (async (req, res) => {
        let movies = await this.prisma.movie.findUnique({
            where: {
              id: req.params.movieId
            },
            include: {
                review: {
                    include: {
                        user: {
                            select: {id: true, firstName: true, lastName: true, email: true}
                        }
                    }
                }
            }
        });
        return res.json({data: movies});
    });

    createMovie = (async (req, res) => {
        const {title, rating, review} = req.body;

        let movie = await this.prisma.movie.upsert({
            where: {
                name: title,
            },
            update: {},
            create: {
                name: title,
            },
        });

        let movieReview = await this.prisma.review.create({
            data: {
                userId: req.user.id,
                movieId: movie.id,
                rating,
                review,
            }
        });

        movie = await this.prisma.movie.findUnique({where: {id: movie.id}, include: {
                review: {
                    include: {
                        user: {
                            select: {id: true, firstName: true, lastName: true, email: true}
                        }
                    }
                }
            }})

        return res.json({data: movie})

    });

    deleteMoview = (async (req, res) => {
        const deleteReview = this.prisma.review.deleteMany({
            where: {
                movieId: req.params.movieId
            }
        });
        const deleteMovie = this.prisma.movie.delete({
            where: {
                id: req.params.movieId,
            },
        });
        const transaction = await this.prisma.$transaction([deleteReview, deleteMovie])
        return res.json({ok: true, transaction});
    });


}

const movieController = new MovieController();

module.exports = {
    movieController
}
