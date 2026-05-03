import {useEffect, useState} from "react";
import useRequest from "../../../hooks/use-request.ts";
import {getEndpointsByServerSrl, getServers, postEndpointByServerSrl} from "../../../apis/server/endpoint.api.ts";
import useMount from "../../../hooks/use-mount.ts";
import type {Endpoint, EndpointMethod, EndpointSave, Server} from "../../../apis/server/models.ts";
import styles from "./index.module.scss";
import Dropdown from "../../../components/select";
import ChevronDownSvg from "@assets/icon/chevron-down.svg?react";
import {getColorByMethod} from "./index.helper.ts";
import PlusIcon from "@assets/icon/plus.svg?react";
import type {Role} from "../../../apis/access/models.ts";
import {getAllRoles, getRolesByEndpointSrl} from "../../../apis/access/role.api.ts";

const INITIAL_ENDPOINT_SAVE: EndpointSave = {
    method: "",
    path: "",
} as const;

export default function EndpointPage() {
    const [servers, setServers] = useState<Server[]>([]);
    const {fetch: fetchGetServers} = useRequest(getServers);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const {fetch: fetchGetAllRoles} = useRequest(getAllRoles);

    useMount(() => {
        fetchGetServers({})
            .then(setServers);
        fetchGetAllRoles({})
            .then(setAllRoles);
    });

    const [selectedServerSrl, setSelectedServerSrl] = useState<number>();
    const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
    const {fetch: fetchGetEndpoints} = useRequest(getEndpointsByServerSrl);
    useEffect(() => {
        if (!selectedServerSrl) return;
        fetchGetEndpoints({path: {serverSrl: selectedServerSrl}})
            .then(setEndpoints);
    }, [fetchGetEndpoints, selectedServerSrl]);

    const [toggleCreateEndpoint, setToggleCreateEndpoint] = useState(false);
    const handleToggleNewEndpoint = () => {
        setToggleCreateEndpoint(true);
    };
    const [endpointSave, setEndpointSave] = useState<EndpointSave>(INITIAL_ENDPOINT_SAVE);
    const {fetch: fetchPostEndpoint} = useRequest(postEndpointByServerSrl);
    const handleCreateEndpoint = () => {
        if (!selectedServerSrl) return;
        if (!endpointSave.method || !endpointSave.path) return;
        fetchPostEndpoint({
            path: {serverSrl: selectedServerSrl},
            body: endpointSave,
        })
            .then(() => {
                setEndpointSave(INITIAL_ENDPOINT_SAVE);
                setToggleCreateEndpoint(false);
                fetchGetEndpoints({path: {serverSrl: selectedServerSrl}})
                    .then(setEndpoints);
            });
    };

    const [endpointRoles, setEndpointRoles] = useState<Role[]>([]);
    const {fetch: fetchGetRolesByEndpointSrl} = useRequest(getRolesByEndpointSrl);
    const [selectedEndpointSrl, setSelectedEndpointSrl] = useState<number>();
    useEffect(() => {
        if (!selectedEndpointSrl) return;
        fetchGetRolesByEndpointSrl({path: {endpointSrl: selectedEndpointSrl}})
            .then(setEndpointRoles);
    }, [fetchGetRolesByEndpointSrl, selectedEndpointSrl]);

    return <section>
        <article className={"w-full h-36 flex justify-start items-center"}>
            <label>
                <Dropdown options={servers.map(server => ({
                    key: server.srl.toString(),
                    value: server.name,
                }))}
                          placeholder={"서버 선택"}
                          onSelect={(key) => setSelectedServerSrl(parseInt(key))}/>
            </label>
        </article>
        {selectedServerSrl &&
            <article className={"flex flex-row"}>
                <article className={"flex flex-col gap-2"} style={{width: '750px'}}>
                    <table>
                        <thead className={"invisible"}>
                        <tr>
                            <th className={"w-24"}></th>
                            <th></th>
                            <th className={"w-0"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {endpoints.map((endpoint) => (
                            <tr className={styles.endpointRow}
                                onClick={() => setSelectedEndpointSrl(endpoint.srl)}>
                                <td className={"p-4"}>
                                    <p className={"w-20 py-1 text-sm text-center text-white font-semibold rounded-full"}
                                       style={{backgroundColor: getColorByMethod(endpoint.method)}}>
                                        {endpoint.method}
                                    </p>
                                </td>
                                <td>{endpoint.path}</td>
                                <td className={"pe-4"}><ChevronDownSvg width={20} className={"rotate-270"}/></td>
                            </tr>
                        ))}
                        {toggleCreateEndpoint ? (
                            <tr>
                                <td className={"px-2"}>
                                    <input className={"small"}
                                           type={"text"}
                                           onChange={(e) => setEndpointSave(prev => ({
                                               ...prev,
                                               method: (e.target.value as EndpointMethod),
                                           }))}/>
                                </td>
                                <td className={"pe-4"}>
                                    <input className={"small"}
                                           type={"text"}
                                           onChange={(e) => setEndpointSave(prev => ({
                                               ...prev,
                                               path: e.target.value,
                                           }))}/>
                                </td>
                                <td>
                                    <button onClick={handleCreateEndpoint}>
                                        <PlusIcon className={"w-4"}/>
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className={"px-4"} colSpan={3}>
                                    <button onClick={handleToggleNewEndpoint}>
                                        <PlusIcon className={"w-4"}/>
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </article>
                {selectedEndpointSrl &&
                    <article className={"flex flex-col ps-20"} style={{width: 'calc(100% - 750px)'}}>
                        <p className={"font-medium"}>역할</p>
                        <ul className={"py-5 min-h-48"}>
                            {endpointRoles.map((role) => (<li className={"text-sm"}>{role.name}</li>))}
                        </ul>
                        <div className={"flex flex-row items-center gap-5"}>
                            <button className={"small max-w-20"}>추가하기</button>
                            <p>역할 선택</p>
                        </div>
                    </article>
                }
            </article>
        }
    </section>;

}