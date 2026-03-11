import NavButton from './NavButton'

export default function Sidebar({
    searchFilter, 
    onFilterChange, 
    selectedDate, 
    onDateChange, 
    onDateSearch,
    onLogout
    }) {
    return (
      <div className='sidebar'>
        <div className='sidebar-content'>
          <NavButton 
            name="Recent" 
            active={searchFilter === "recent"} //prop is true or false
            onClick={() => onFilterChange('recent')}>
          </NavButton>
          <NavButton 
            name="Today" 
            active={searchFilter === "today"} 
            onClick={() => onFilterChange('today')}
            info="All posts saved on the current date">
            
          </NavButton>
          <div className="dateForm">
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => onDateChange(e.target.value)} 
            />
            <NavButton 
              name="Go" 
              onClick={onDateSearch}
            />
          </div>
        </div>

        <div className="sidebar-bottom">
          <NavButton
              name="Logout"
              onClick={onLogout}
          />
        </div>
      </div>  
    )
}
