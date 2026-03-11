import { useState } from 'react';


export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [jumpTo, setJumpTo] = useState("");
  
  const handleJump = () => {
    const pageNum = parseInt(jumpTo)
    if (pageNum >= 1 && pageNum <= totalPages){
      onPageChange(pageNum)
      setJumpTo("")
    } else{
      alert(`Please select a page between 1 and ${totalPages}.`);
    }
  }

  const start = Math.max(currentPage - 3, 1)
  const end = Math.min(currentPage + 3, totalPages)

  const pages = [];
  for (let i = start; i <= end; i++){
    pages.push(i)
  }
  

  return (
    <div className='pagination'>
      <button 
        onClick={() => onPageChange(1)}
        className="page-btn"
      >
        {"First"}
      </button>

      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        className="page-btn"
      >
        &laquo;
      </button>

      {pages.map((p, index) => (
          <button
            key={p}
            className={currentPage === p ? 'page-btn active' : 'page-btn'}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        className="page-btn"
      >
        &raquo;
      </button>
      <button 
        onClick={() => onPageChange(totalPages)}
        className="page-btn"
      >
        {"Last"}
      </button>
      
      <div className='jump'>
        <input
        type="number"
        value={jumpTo}
        onChange={(e) => setJumpTo(e.target.value)}
        name="page" 
        min="1"
        max={totalPages} 
        placeholder="Page..."
        className="jump-input"
        onKeyDown={(e) => e.key === 'Enter' && handleJump()} 
        >
        </input>
      <button 
        onClick={handleJump}
        className="page-btn"
      >Go
      </button>
      </div>
      
    </div>
  );
}