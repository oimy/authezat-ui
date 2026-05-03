import type {ReactNode} from "react";
import useMount from "../hooks/use-mount.ts";

export default function Page({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    useMount(() => {
        document.title = title;
    });

    return <>{children}</>;
}