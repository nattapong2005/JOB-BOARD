import Swal from "sweetalert2";

export const showSuccess = (text, url) => {
  Swal.fire({
    title: "สำเร็จ",
    text,
    icon: "success",
    showCancelButton: false,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    timer: 2500,
    timerProgressBar: true,
    buttonsStyling: false,
    iconHtml: '<i class="fa-solid fa-circle-check"></i>',
    width: "30em",
    customClass: {
      icon: "text-2xl  border-none",
      popup: "shadow-2xl",
      confirmButton: "ms-2 bg-blue-900 hover:bg-blue-700 text-white font-bold py-1.5 px-10 rounded-md shadow-md",
      cancelButton: "ms-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-6 rounded-md shadow-md",
    },
    showClass: {
      popup: "animate__animated animate__zoomIn animate__faster",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut animate__faster",
    },
  }).then((res) => {
    if (res.isConfirmed) {
      window.location.href = url;
    }
  });
};



export const showConfirm = (title, text, onConfirm) => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      buttonsStyling: false,
      width: "30em",
      customClass: {
        icon: "text-2xl border-none bg-amber-500",
        popup: "shadow-2xl",
        confirmButton: "ms-2 bg-blue-900 hover:bg-blue-700 text-white font-bold py-1.5 px-10 rounded-md shadow-md",
        cancelButton: "ms-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-6 rounded-md shadow-md",
      },
      showClass: {
        popup: "animate__animated animate__zoomIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut animate__faster",
      },
    }).then((res) => {
        if(res.isConfirmed && typeof onConfirm === "function") {
            onConfirm();
        }
    });
  };
  

export const showError = (text, url) => {
    Swal.fire({
      title: "ไม่สำเร็จ",
      text,
      icon: "error",
      showCancelButton: false,
      confirmButtonText: "ยืนยัน",
      timer: 2500,
      timerProgressBar: true,
      buttonsStyling: false,
      width: "30em",
      customClass: {
        icon: "text-2xl border-none bg-red-600",
        popup: "shadow-2xl",
        confirmButton: "ms-2 bg-blue-900 hover:bg-blue-700 text-white font-bold py-1.5 px-10 rounded-md shadow-md",
        cancelButton: "ms-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-6 rounded-md shadow-md",
      },
      showClass: {
        popup: "animate__animated animate__zoomIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut animate__faster",
      },
    }).then((res) => {
        if(res.isConfirmed) {
            window.location.href = url;
        }
    });
  };
  