module.exports = {
  //Basic
  basic(msg) {
    swal(msg);
  },

  //A title with a text under
  title() {
    swal(
      "Here's a message!",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis"
    );
  },

  //Success Message
  Success(title, msg, condition) {
    swal(title, msg, condition);
  },

  //Warning Message
  Warning(t1, t2) {
    swal(
      {
        title: t1,
        text: t2,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "我知道了",
        closeOnConfirm: true,
      },
      function () {
        // swal("Deleted!", "Your imaginary file has been deleted.", "success");
      }
    );
  },

  //Parameter
  Parameter() {
    swal(
      {
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false,
      },
      function (isConfirm) {
        if (isConfirm) {
          swal("Deleted!", "Your imaginary file has been deleted.", "success");
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      }
    );
  },

  //Custom Image
  image() {
    swal({
      title: "Sweet!",
      text: "Here's a custom image.",
      imageUrl: "assets/vendor/sweetalert/example/images/thumbs-up.jpg",
    });
  },

  //Auto Close Timer
  Timer(title, msg) {
    swal({
      title: title,
      text: msg,
      timer: 2000,
      showConfirmButton: false,
    });
  },
};
