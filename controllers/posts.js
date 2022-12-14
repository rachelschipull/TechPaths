// const cloudinary = require("../middleware/cloudinary");
const Milestone = require("../models/Milestone");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const milestones = await Milestone.find({user: req.user.id}).sort({ year: "asc"}).lean();
      console.log(milestones)
      res.render("profile.ejs", { posts: posts, user: req.user, milestones: milestones});
    } catch (err) {
      console.log(err);
    }
  },
  getDashboard: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const milestones = await Milestone.find({user: req.params.id}).sort({ year: "asc"}).lean();
      res.render("dashboard.ejs", { user: user, milestones: milestones});
      console.log(user)
      console.log(req.params._id)
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const milestones = await Milestone.find({user: req.user.id}).sort({ year: "asc"}).lean();
      res.render("public.ejs", { posts: posts, user: req.user, industry: req.body.industry, goal: req.body.goal, github: req.body.github, linkedin: req.body.linkedin, milestones: milestones });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      await Post.create({
        user: req.user.id,
        industry: req.body.industry, 
        goal: req.body.goal
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  updateUser: async(req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id},
        { $set: {
          goal: req.body.goal,
          github: req.body.github,
          linkedin: req.body.linkedin,
        }
        },
      );
      console.log("Profile has been updated");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  deleteMilestone: async (req, res) => {
    try {
    let post = await Milestone.findById({_id: req.params.id})    
    await Milestone.remove({ _id: req.params.id});
    console.log('Deleted Milestone');
    res.redirect('/profile');
    } catch (err) {
        res.redirect('/profile')
    }
  },
};
