import styles from './index.module.scss';
import {useState} from "react";
import ChevronDownSvg from "@assets/icon/chevron-down.svg?react";
import clsx from "clsx";

interface SelectOption {
    key: string;
    value: string;
}

export default function Dropdown({
    options,
    placeholder = "-",
    onSelect,
}: {
    options: SelectOption[],
    placeholder?: string
    onSelect: (key: string) => void;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption>();

    return <div className={"inline-grid relative"}>
        <div className={"hidden h-0 pointer-events-none overflow-hidden"} aria-hidden={'true'}>
            {options.map(option => (
                <div className={clsx("flex flex-row text-4xl px-15", styles.label)}>
                    <span>{option.value}</span>
                </div>
            ))}
        </div>
        <div className={clsx("flex flex-row justify-between cursor-pointer rounded-xl py-4 px-7", styles.selectContainer)}
             onClick={() => setIsOpen(!isOpen)}>
            <span className={"text-4xl me-5"}>
                {selectedOption ? selectedOption.value : placeholder}
            </span>
            <ChevronDownSvg className={clsx("w-10", isOpen ? styles.rotate : styles.unrotate)}/>
        </div>
        <div className={clsx("w-full absolute top-18 left-0 bg-white", isOpen ? styles.appear : styles.disappear)}>
            <ul className={"w-full text-2xl rounded-xl"}>
                {options.map(option => (
                    <li className={clsx("w-full my-2 py-3 ps-7 rounded-xl", styles.option)}
                        key={option.key}
                        onClick={() => {
                            setSelectedOption(option);
                            onSelect(option.key);
                            setIsOpen(false);
                        }}>{option.value}</li>
                ))}
            </ul>
        </div>
    </div>;

}