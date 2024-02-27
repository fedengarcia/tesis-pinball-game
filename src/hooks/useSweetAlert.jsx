import Swal from "sweetalert2";
import './sweetAlertClasses.css'

export default function useSweetAlert () {

    const modal = async (title,text, onConfirmFunction) => {
        Swal.fire({
            text: text,
            allowOutsideClick: false,
            title: title,
            confirmButtonText: 'Accept',
            color: 'black',
            confirmButtonColor: '#1565c0',
            background: 'rgb(255,255,255)',
            focusConfirm: false,
            customClass: {
                popup: 'modalContainer',
            }
        }).then(async(result) => {
            if (result.isConfirmed) {
                await onConfirmFunction()
            }
        })
    }


    const popUp = ({message, popUpPosition, timer, textColor, showProgressBar, props}) => {
        return  <>
        {Swal.fire({
            toast: true,
            title: message,
            position: popUpPosition ?? 'bottom',
            showConfirmButton: false,
            timer: timer ? timer : 1000,
            timerProgressBar: true,
            color: textColor ?? 'black',
            customClass: {
                popup: 'modalContainer coloredToast',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            ...props,
        })}
        </>
    }


    return {
        modal,
        popUp
    }
}

   
