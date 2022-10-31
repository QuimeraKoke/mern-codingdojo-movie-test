const { PrismaClient } = require('@prisma/client')

class ReviewController {

    prisma = new PrismaClient();

    createReview = (async (req, res) => {
        const {rating, review} = req.body;

        let movie = await this.prisma.movie.findUnique({
            where: {
                id: req.params.movieId,
            }
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

    deleteReview = (async (req, res) => {

        let review = await this.prisma.review.findUnique({where: {id: req.params.reviewId}, include: {user: true}});

        if (review.user.id === req.user.id){
            const deleteReview = await this.prisma.review.delete({
                where: {
                    id: req.params.reviewId,
                },
            });

            return res.json({ok: true, deleteReview});
        } else {
            return res.status(401).json({message: "Not authorized"})
        }
    });


}

const reviewController = new ReviewController();

module.exports = {
    reviewController
}
