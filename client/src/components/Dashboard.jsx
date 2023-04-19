import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from '../api/axios';

const ADDCONTACT_URL = '/contacts';

const svgPLUS = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>
);

function makeList() {
    return (
        <>
            <li>
                <div className="placeholder avatar">
                    <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                        <span className="text-xs">A</span>
                    </div>
                    <a>Sidebar Item 101</a>
                </div>
            </li>
            <li>
                <div className="placeholder avatar">
                    <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                        <span className="text-xs">A</span>
                    </div>
                    <a>Sidebar Item 2</a>
                </div>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
            <li>
                <a>Sidebar Item 2</a>
            </li>
        </>
    );
}

function makeChat() {
    return (
        <>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin, <br />I have the high ground.
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">
                    You underestimate my power! you bitch ill fkn kill u stfu ok
                </div>
            </div>
        </>
    );
}

function addContactModal() {
    const { auth } = useAuth;

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = axios.put(
                ADDCONTACT_URL,
                JSON.stringify({
                    contact: 0,
                })
            );
        } catch (err) {}
    };

    return (
        <>
            <label htmlFor="my-modal-3" className="btn-sm btn-square btn">
                {svgPLUS}
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="my-modal-3"
                        className="btn-sm btn-circle btn absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">ADD NEW CONTACT</h3>
                    <form
                        className="flex justify-between gap-2 py-4"
                        onSubmit={onSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Contact Name"
                            className="input-bordered input w-full max-w-xs"
                        />
                        <button className="btn" type="submit">
                            ADD Contact
                        </button>
                    </form>
                    <div>{/* TODO: ERROR MESSAGE */}</div>
                </div>
            </div>
        </>
    );
}

export default function Dashboard() {
    return (
        <>
            <section className="flex h-full flex-col justify-start">
                <div className="flex justify-between">
                    <div className="border- drawer h-[95vh] w-3/12 border-r-4 border-[color:var(--color-border)] bg-base-300 ">
                        <div className="drawer-side h-auto">
                            <label
                                htmlFor="my-drawer-2"
                                className="drawer-overlay"
                            >
                                <div
                                    w-full
                                    className="border-b-4 border-[color:var(--color-border)] "
                                />

                                <div className="flex items-center justify-between p-4">
                                    <p>Contacts</p>
                                    {addContactModal()}
                                </div>
                                <div
                                    w-full
                                    className="border-b-4 border-[color:var(--color-border)] pr-8"
                                />
                            </label>
                            <ul className="menu max-h-[75vh] w-auto flex-nowrap overflow-y-scroll text-base-content">
                                {makeList()}
                            </ul>
                            {/* <div>EOL</div> */}
                        </div>
                    </div>

                    <div className="w-9/12 ">
                        <label htmlFor="my-drawer-2" className="drawer-overlay">
                            <div
                                w-full
                                className="border-b-4 border-[color:var(--color-border)] "
                            />
                            <div className="p-4">Ammar</div>
                            <div
                                w-full
                                className="border-b-4 border-[color:var(--color-border)] "
                            />
                        </label>

                        <div className="h-[75vh] overflow-y-scroll px-4 pt-4">
                            {makeChat()}
                        </div>

                        <div className=" p-4">
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input-bordered input-secondary input w-9/12 "
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
