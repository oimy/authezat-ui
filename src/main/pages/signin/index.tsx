import styles from "./index.module.scss";
import clsx from "clsx";
import OiaSvg from "@assets/media/oia.svg?react";
import type {Sign} from "../../apis/signin/models.ts";
import {Form, useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";

export default function Signin() {
    const {
        register,
        control,
        formState,
        setError,
    } = useForm<Sign>();
    const [name, setName] = useState("");

    const handleSuccessSignin = () => {
        axios.get("/api/authezat/v1/account/users/1")
            .then(res => setName(res.data.name))
            .catch(() => {
                window.location.href = "https://authezat-local.soia.asia";
            });
    };

    return (<section className={"flex flex-center flex-col w-full h-full"}>
        <OiaSvg className={styles.logoRotate}
                width={200} height={200} viewBox="0 0 1444 1448"/>
        <article className={clsx("mt-14 pb-20", styles.signinContainer)}>
            <Form className={"flex flex-col gap-6"}
                  control={control}
                  action={"/edge/auth/signin"}
                  encType={'application/json'}
                  onSuccess={handleSuccessSignin}
                  onError={() => setError("password", {"message": "로그인에 실패했습니다"})}>
                <input className={"large"}
                       type={"text"}
                       placeholder={"이름"}
                       autoComplete={"username"}
                       disabled={formState.isSubmitting}
                       {...register("username", {required: true})}/>
                <input className={"large"}
                       type={"password"}
                       placeholder={"비밀번호"}
                       autoComplete={"current-password"}
                       disabled={formState.isSubmitting}
                       aria-invalid={!!formState.errors.password}
                       aria-describedby={formState.errors.password?.message}
                       {...register("password", {required: true})}/>
                <button type={"submit"} disabled={!formState.isValid || formState.isSubmitting}>로그인</button>
            </Form>
        </article>
        {name && <div className={"p-abs"} style={{top: "10%"}}>
            <p style={{whiteSpace: "nowrap"}}>환영합니다. <b>{name}</b>님</p>
        </div>}
    </section>);
}