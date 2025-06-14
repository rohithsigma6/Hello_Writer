import CodingInProgressImg from '@/assets/coding-in-progress.svg';

const CodingInProgress = () => {
    return (
        <div className="p-5 flex items-center justify-center bg-white h-full rounded-[24px] px-[32px] pt-[40px] font-poppins">
            <img
                className="w-[40%]"
                alt="Coding-in-progress"
                src={CodingInProgressImg}
            ></img>
        </div>
    )
}

export default CodingInProgress