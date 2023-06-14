import mongoose from "mongoose";

enum ArticleStatusType {
  DRAF,
  APPROVED,
  PUBLISHED,
}

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      default: [],
    },
    authorId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ArticleStatusType,
      default: ArticleStatusType.DRAF,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export { Article, ArticleStatusType };
