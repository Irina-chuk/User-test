import "./app-filter.scss";



const AppFilter = ({onSort}) => {
    return (
        <div className="wrapper_filter">
            <span>Сортировка</span>
            <button className="btn" onClick={() => onSort("city")}>по городу</button>
            <button className="btn" onClick={() => onSort("company")}>по компании</button>
        </div>
    )
}
export default AppFilter;