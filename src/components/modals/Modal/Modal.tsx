import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ModalInterface } from '../../../interfaces/interfaces';
import { Dark } from '../../../utilities/globalImports';
import { MdClose } from 'react-icons/md';

function Modal({
  children,
  label,
  open,
  setOpen,
  closeable = true,
}: ModalInterface): JSX.Element {
  const cancelButtonRef = useRef(null);
  const dark = Dark();

  const mockFunction = () => {};

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[98] inset-0 overflow-y-auto text-white "
        initialFocus={cancelButtonRef}
        onClose={closeable ? setOpen : mockFunction}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 font-Comfortaa">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`relative inline-block align-bottom bg-primaryDark rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
              }`}
            >
              <div
                className={`p-4 sm:p-6 sm:pb-4 w-full  ${
                  dark ? 'bg-secondaryColor' : 'bg-primaryColor'
                }`}
              >
                <div className="flex  justify-between border-b-[1px] border-white border-opacity-30 mb-5">
                  <h2 className="w-max font-semibold mt-[.2rem]">{label}</h2>
                  <button
                    type="button"
                    className={`rounded-full cursor-pointer hover:bg-cusOrange hover:text-white outline-none ml-3 mb-3 ${
                      closeable ? '' : 'hidden'
                    }`}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    <MdClose
                      className="rounded-lg opacity-[.75] text-white hover:text-red-400 "
                      size={25}
                    />
                  </button>
                </div>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
