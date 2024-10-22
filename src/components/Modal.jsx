import { XCircleIcon } from "@heroicons/react/16/solid"

function Modal({title, onOpen, open, children}){
    if(!open) return null
    return(
        <div className="backdrop" >
            <div className="modal">
                <div className="modal__header">
                    <h2 className="title">{title}</h2>
                    <button onClick={()=>onOpen(false)} >
                        <XCircleIcon className="icon close" />
                    </button>
                </div>
                {children}
            </div>

        </div>
    )
}

export default Modal