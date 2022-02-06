import Swal from "sweetalert2";

export const errorAlert = (err) => {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
        confirmButtonColor: "#E60965",
    })
}

export const successAlert = (title, message) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        confirmButtonColor: "#E60965",
    })
}

export const infoAlert = (title, message) => {
    return Swal.fire({
        icon: 'info',
        title: title,
        text: message,
        confirmButtonColor: "#E60965",
    })
}