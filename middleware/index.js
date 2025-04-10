module.exports.isOwnerOrAdmin = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (req.user && (req.user.isAdmin || listing.owner.equals(req.user._id))) {
      return next();
    }

    req.flash("error", "You don't have permission to do that!");
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};
