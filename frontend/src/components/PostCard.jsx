import { useEffect } from 'react';

export default function PostCard({el, onDelete}){
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []); // [] = only once

  const getFormattedDate = (isoString) => {
    if (!isoString) return "";
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',  
      month: '2-digit', 
      year: 'numeric'
    }).format(new Date(isoString));
  };
  
  return (
    <div className='post-card'>
        <blockquote 
          className="instagram-media"
          data-instgrm-permalink={el.href}
          data-instgrm-version="14"
        >
        </blockquote>

        <div className="post-footer">
            <button 
                className='btn btn-primary fa fa-trash delete-btn'
                onClick={() => onDelete(el._id)}
            />
            <div className="date-wrapper">
            <i className="far fa-calendar-alt"></i> 
            <span>{getFormattedDate(el.savedAt)}</span>
            </div>
        </div>
    </div>
  )
}

