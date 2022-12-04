import useWindowSize from '../../hooks/useWindowsSize';
import { Dark } from '../../utilities/globalImports';

const LoadingCard = () => {
  const dark = Dark();

  const vw = useWindowSize();
  return (
    <div
      className={`h-[10rem] w-full semiSm:ml-2 rounded mb-2 flex justify-between text-xs ${
        dark ? 'bg-primaryColor ' : 'bg-secondaryColor'
      } ${
        dark
          ? 'text-secondaryColor semiSm:text-primaryColor'
          : 'text-primaryColor'
      }`}
    >
      <div
        className={`flex flex-col ml-2 pt-2 items-start w-[73%] semiSm:ml-5 ${
          vw > 840 ? '' : 'mobileTaskCardBoxShadow'
        }`}
      >
        <div className="flex justify-between w-full ">
          <div
            className={`py-1 px-2 rounded animate-pulse ${
              dark
                ? 'bg-secondaryColor semiSm:bg-primaryColor'
                : 'bg-primaryColor'
            }`}
          >
            st
          </div>
          <div
            className={`py-1 px-5 mr-2 rounded animate-pulse ${
              dark
                ? 'bg-secondaryColor semiSm:bg-primaryColor'
                : 'bg-primaryColor'
            }`}
          >
            date
          </div>
        </div>
        <div
          className={`mt-10 py-1 px-10 rounded animate-pulse semiSm:self-center semiSm:ml-10 ${
            dark
              ? 'bg-secondaryColor semiSm:bg-primaryColor'
              : 'bg-primaryColor'
          }`}
        >
          content
        </div>
        <div
          className={`mt-7 py-1 px-5 rounded animate-pulse ${
            dark
              ? 'bg-secondaryColor semiSm:bg-primaryColor'
              : 'bg-primaryColor'
          }`}
        >
          buttons
        </div>
      </div>

      <div
        className={`self-center mr-2 h-fit py-1 rounded animate-pulse semiSm:mr-5 ${
          dark ? 'bg-secondaryColor semiSm:bg-primaryColor' : 'bg-primaryColor'
        }`}
      >
        star
      </div>
    </div>
  );
};

export default LoadingCard;
