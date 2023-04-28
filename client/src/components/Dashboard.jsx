import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import axios from '../api/axios';

const CONTACT_URL = '/contacts';
const CHAT_URL = '/chats';

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

function AddContactModal({ contacts }) {
    const { auth } = useAuth();
    const { setContactList } = contacts;

    const [contactInput, setContactInput] = useState('');
    const [msg, setMsg] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('adding contacts');
            await axios.put(
                CONTACT_URL,
                JSON.stringify({
                    contact: contactInput,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                },
            );
            setContactList((prev) => {
                return [
                    ...prev,
                    {
                        username: contactInput,
                        lastMessageTime: null,
                        lastMessageRead: true,
                    },
                ];
            });
            setMsg('Contact Added');
            setContactInput('');
        } catch (err) {
            setMsg(err.response.data.message);
        }
    };

    return (
        <div className="p-0">
            <label htmlFor="my-modal" className="btn-square btn-sm btn">
                {svgPLUS}
            </label>
            <input
                type="checkbox"
                id="my-modal"
                className="modal-toggle"
                onChange={() => {
                    setContactInput('');
                    setMsg('');
                }}
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="my-modal"
                        className="btn-square btn-sm btn absolute right-2 top-2"
                    >
                        X
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
                            value={contactInput}
                            onChange={(e) => {
                                setContactInput(e.target.value);
                                setMsg('');
                            }}
                            autoComplete="off"
                        />
                        <button className="btn" type="submit">
                            ADD CONTACT
                        </button>
                    </form>
                    <div className="h-3">
                        {/* TODO: ERROR MESSAGE */}
                        {msg}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MakeContacts({ contacts, focus }) {
    const { auth } = useAuth();
    const { contactList, setContactList, setContactsRecv } = contacts;
    const { focusVal, contactFocus, setContactFocus } = focus;

    useEffect(() => {
        let ignore = false;
        async function getContacts() {
            console.log('getting contacts');
            // useLocalStorage ?
            try {
                const res = await axios.get(CONTACT_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });

                if (!ignore) {
                    console.log(res.data.contacts);
                    setContactList((prev) => {
                        return [...prev, ...res.data.contacts];
                    });
                    setContactsRecv(true);
                }
            } catch (err) {
                console.log('err cant get contacts');
            }
        }
        getContacts();

        return () => {
            setContactList([]);
            ignore = true;
        };
    }, []);

    return (
        <>
            {contactList.length ? (
                <>
                    {contactList.map((contact, index) => (
                        <li key={`${index}_contact`}>
                            <div
                                className={
                                    contactFocus === contact.username
                                        ? 'active'
                                        : ''
                                }
                                onClick={() => {
                                    setContactFocus(contact.username);
                                    focusVal.current = contact.username;
                                    console.log(focusVal.current);
                                }}
                            >
                                <div className="placeholder avatar">
                                    <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                                        <span className="text-xs">
                                            {contact.username[0].toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <div>{contact.username}</div>
                                    <div>
                                        {!contact.lastMessageRead ? (
                                            <div
                                                className="h-2 w-2 rounded-full bg-green-600
                                            "
                                            ></div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </>
            ) : (
                <li className="self-center pt-4">No Contacts</li>
            )}
        </>
    );
}

function MakeChat({ focus, socket, newMsg, contacts }) {
    const { auth } = useAuth();

    const { contactList, setContactList } = contacts;

    const [msgInput, setMsgInput] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        console.log('making chat for: ', focus);
        let ignore = false;
        async function getChats() {
            console.log('getting chats');
            // useLocalStorage ?
            try {
                const res = await axios.get(`${CHAT_URL}\\${focus}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                });
                // console.log(res.data);
                if (!ignore) {
                    setChats((prev) => {
                        return [...prev, ...res.data.message];
                    });

                    // TODO: Message Read
                    let i;
                    for (i = 0; i < contactList.length; i++) {
                        if (contactList[i].username === focus) {
                            break;
                        }
                    }
                    setContactList((prev) => {
                        const newArr = [...prev];
                        newArr[i].lastMessageRead = true;
                        return newArr;
                    });

                    // TODO: tell server to make it read
                    // let tempContact
                }
            } catch (err) {
                console.log('err cant get contacts');
            }
        }
        getChats();

        socket.on('');

        return () => {
            setChats([]);
            ignore = true;
        };
    }, [focus]);

    // FIXME: reset this
    useEffect(() => {
        if (newMsg.sender === focus) {
            setChats((prev) => {
                return [
                    ...prev,
                    {
                        creator: newMsg.sender,
                        time: Date.now(),
                        content: newMsg.message,
                    },
                ];
            });
        }
        // return () => {
        //     setChats([]);
        // };
    }, [newMsg]);

    const handleMessage = async (e) => {
        e.preventDefault();

        if (msgInput === '') return;

        try {
            socket.emit(
                'socket/send_msg',
                focus,
                msgInput,
                function (res, err) {
                    if (err) {
                        console.error('There was an error:', err);
                    } else {
                        console.log('The server responded with:', res);
                        setChats((prev) => {
                            return [
                                ...prev,
                                {
                                    creator: auth.userID,
                                    time: Date.now(),
                                    content: msgInput,
                                },
                            ];
                        });

                        setMsgInput('');
                    }
                },
            );
        } catch (err) {
            console.error('There was an error:', err);
        }
    };

    return (
        <>
            <div className="border-b-4 border-[color:var(--color-border)] " />
            <div className="bg-base-300 p-4">{focus}</div>
            <div className="border-b-4 border-[color:var(--color-border)] " />
            <div className="h-[80vh] overflow-y-scroll px-4 pt-4 ">
                {/* TODO: Suspense Loading ?? */}

                {/* ADD NO MESSAGE INDICATOR */}
                {/* {chats.length ? (

                ) : (
                    <h1>NO Chats</h1>
                )

            } */}
                {chats.map((chat, index) => (
                    <>
                        {chat.creator === auth.userID ? (
                            <div key={index} className="chat chat-end">
                                <div className="chat-bubble">
                                    {chat.content}
                                </div>
                                {/* <div className="chat-footer opacity-50">{}</div> */}
                            </div>
                        ) : (
                            <div key={index} className="chat chat-start">
                                <div className="chat-bubble">
                                    {chat.content}
                                </div>
                                {/* <div className="chat-footer opacity-50">{}</div> */}
                            </div>
                        )}
                    </>
                ))}
                {/* <MakeChat focus={focus} /> */}
            </div>

            <form
                className="flex justify-between gap-2 bg-base-300 p-4 px-1 py-1"
                onSubmit={handleMessage}
            >
                <input
                    type="text"
                    placeholder="Type here"
                    className="input-bordered input-secondary input w-full "
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                />
                <button className="btn-success btn" type="submit">
                    SEND
                </button>
            </form>
        </>
    );
}

export default function Dashboard() {
    const { socket } = useSocket();
    const [conn, setConn] = useState(false);

    const [contactsRecv, setContactsRecv] = useState(false);
    const [contactList, setContactList] = useState([]);

    const [contactFocus, setContactFocus] = useState('');
    const [newMsg, setNewMsg] = useState({ sender: '', message: '' });

    const focusVal = useRef('');

    useEffect(() => {
        try {
            socket.connect();

            socket.on('test', (msg) => {
                setConn(true);
            });

            socket.on('socket/new_contact_msg', (sender) => {
                console.log('adding new contact', sender);
                setContactList((prev) => {
                    return [
                        ...prev,
                        {
                            username: sender,
                            lastMessageRead: true,
                            lastMessageTime: null,
                        },
                    ];
                });
            });

            socket.on('socket/recv_msg', (sender, msg) => {
                // console.log(contactList);
                console.log(focusVal.current, sender);
                if (focusVal.current !== sender) {
                    let i;
                    for (i = 0; i < contactList.length; i++) {
                        if (contactList[i].username === sender) {
                            break;
                        }
                    }
                    setContactList((prev) => {
                        const newArr = [...prev];
                        newArr[i].lastMessageRead = false;
                        return newArr;
                    });
                }

                console.log('new message from', sender);
                setNewMsg({ sender: sender, message: msg });
            });

            socket.emit('test');
        } catch {
            console.log('server error');
        }

        return () => {
            // console.log('returning');

            socket.off('test');
            socket.off('socket/new_contact_msg');
            socket.off('socket/recv_msg');

            socket.disconnect();
        };
    }, [contactsRecv]);

    return (
        <>
            {conn ? (
                <section className="flex h-full flex-col justify-start">
                    <div className="flex justify-between">
                        <div className="border- drawer h-[95vh] w-3/12 border-r-4 border-[color:var(--color-border)] bg-base-300 ">
                            <div className="drawer-side h-auto">
                                {/* <label
                                htmlFor="my-drawer-2"
                                className="drawer-overlay"
                            > */}
                                <div
                                    // w-full
                                    className="border-b-4 border-[color:var(--color-border)] "
                                />

                                <div className="flex items-center justify-between p-4">
                                    <p>Contacts</p>
                                    <AddContactModal
                                        contacts={{
                                            setContactList,
                                        }}
                                    />
                                </div>
                                <div
                                    // w-full
                                    className="border-b-4 border-[color:var(--color-border)] pr-8"
                                />
                                {/* </label> */}
                                <ul className="menu max-h-[75vh] w-auto flex-nowrap overflow-y-scroll text-base-content">
                                    <MakeContacts
                                        contacts={{
                                            contactList,
                                            setContactList,
                                            setContactsRecv,
                                        }}
                                        focus={{
                                            focusVal,
                                            contactFocus,
                                            setContactFocus,
                                        }}
                                    />
                                </ul>
                            </div>
                        </div>

                        <div className="w-9/12 ">
                            {contactFocus === '' ? (
                                <div className="flex h-[75vh] justify-center text-3xl">
                                    <span className="self-center">
                                        SELECT CHAT TO LOAD
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <MakeChat
                                        focus={contactFocus}
                                        socket={socket}
                                        newMsg={newMsg}
                                        contacts={{
                                            contactList,
                                            setContactList,
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <h1>Loading ... </h1>
            )}
        </>
    );
}
