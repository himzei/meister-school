import { FiLogIn } from "react-icons/fi";

export const ButtonWrapper = ({ text }) => {
  return (
    <div className="flex items-center justify-center pr-4">
      <RoundedSlideButton text={text} />
    </div>
  );
};

const RoundedSlideButton = ({ text }) => {
  return (
    <button
      className={`
        relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
         px-4 py-2 font-semibold text-muted-foreground text-sm border-muted-foreground
         transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-primary
        before:transition-transform before:duration-1000
        before:content-[""]

        group-hover:scale-105 group-hover:text-neutral-100
        group-hover:before:translate-x-[0%]
        group-hover:before:translate-y-[0%]
				group-hover:border-muted

        active:scale-95`}
    >
      <FiLogIn />
      <span className="">{text}</span>
    </button>
  );
};
