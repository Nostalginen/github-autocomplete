import { ReactComponent as LinkIcon } from "../../assets/icons/external-link.svg";
import { PER_PAGE } from "../constants";
import "./list-item.scss";

const ListItem = ({ data, index, pageIndex }) => {
    const delay = index > 9 ? 0 : index / 10;
    const trueIndex = (pageIndex * PER_PAGE) + index + 1;
    return (
        <li style={{ animationDelay: `${delay}s` }} className="list-item__container">
            <a className="list-item__wrapper" target="_blank" rel="noreferrer" href={data.url} data-index={trueIndex}>
                <span className="index">{trueIndex}</span>
                <div className="type__container">
                    <span className="type">{data.type}</span>
                </div>
                <h2>{data.name}</h2>
                <LinkIcon className="icon" height="20" width="20" aria-hidden="true" />
            </a>
        </li >
    )

}

export default ListItem;