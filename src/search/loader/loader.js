import "./loader.scss";

const Loader = () => {
    return (
        <>
            <span className="sr-only">Loading</span>
            <div aria-hidden="true" className="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </>
    )

}

export default Loader;