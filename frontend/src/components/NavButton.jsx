
export default function NavButton({name, onClick, active, info}) {
  return (
    <div className='navBtnWrapper'>
      <button
        className={`navBtn ${active ? 'active' : ''}`} //change button color
        onClick={onClick}
      >
        {name}
        {info && (
          <span className='infoIcon' title={info}>
            <i className="fas fa-info-circle"></i>
          </span>
        )}

      </button>

    </div>
  )
}