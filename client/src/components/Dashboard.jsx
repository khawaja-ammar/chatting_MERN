import React from 'react';

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

export default function Dashboard() {
	return (
		<>
			<section className="flex h-full flex-col justify-start">
				<div className="flex justify-between">
					<div className="border- drawer h-[95vh] w-3/12 border-r-4 border-[color:var(--color-border)] bg-base-300 ">
						<div className="drawer-side h-auto">
							<label htmlFor="my-drawer-2" className="drawer-overlay">
								<div
									w-full
									className="border-b-4 border-[color:var(--color-border)] "
								/>

								<div className="py-4">Contacts</div>
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
