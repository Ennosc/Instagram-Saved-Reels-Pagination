import { useState, useEffect } from 'react'
import '../App.css'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import { useNavigate } from 'react-router-dom'

export default function Saved() {
    const [posts, setPosts] = useState([])// setPosts to change posts
    const [loading, setLoading] = useState(true) //show user its loading
    const [searchFilter, setSearchFilter] = useState("recent") //recent, today or date
    const [selectedDate, setSelectedDate] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

  const fetchPosts = async () => {
      setLoading(true)
      try{
        const response = await fetch(`/api/saved?filter=${searchFilter}&selectedDate=${selectedDate}&page=${page}`, {
          credentials: 'include'
        }) // api = localhost:8080

        if (response.status === 401) {
          navigate('/')
          return
        }

        const data = await response.json()
        //console.log(data)
        setPosts(data.saved || [])
        setTotalPages(data.totalPages || 1); 
        setLoading(false)
      } catch (err) {
          console.log("Loading error: ", err)
          setLoading(false)
      }
    }
  
  useEffect( () => {
    fetchPosts()
  }, [searchFilter, page]); // dependency array, if any variable changes run useEffect/fetch

  const deletePost = async (id) => {
    try{
      const response = await fetch(`/api/saved/${id}`, {
        method: 'DELETE',
        })
      if (response.ok){
        setPosts(prevPosts => prevPosts.filter(post=> post._id !== id))
      }
    } catch(err){
      console.log("no delete:" , err)
    }
  }
  const handleFilterChange = (newFilter) => {
    setSearchFilter(newFilter)
    setPage(1)
  }

  const handleDateSearch = () => {
    console.log("handleDateSearch")
    if (!selectedDate) return alert("Please select a date.")

    setPage(1)
    if (searchFilter == "date"){
      fetchPosts()
    } else{
      setSearchFilter("date")
    }
  }

  const getFormattedDate = (isoString) => {
    if (!isoString) return "";
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',   // Nicht '2d'
      month: '2-digit', // Nicht '2d'
      year: 'numeric'
    }).format(new Date(isoString));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include'
      })
      
      if (response.ok) {
        navigate("/")
      }

    } catch (err) {
      console.error("Logout failed ", err);
    }
  }


  return (
    <div className="layout">
      <Sidebar
        searchFilter={searchFilter}
        onFilterChange={handleFilterChange}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onDateSearch={handleDateSearch}
        onLogout={handleLogout}
      >
      </Sidebar>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='content'>  
          <div className='posts'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} el={post} onDelete={deletePost} />
              ))
            ) : (
              <div className="no-posts-container">
                <i className="fas fa-search-minus" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                <p>
                  {searchFilter === 'date' 
                    ? `No saved posts found for ${getFormattedDate(selectedDate)}.` 
                    : "No saved posts found."}
                </p>
              </div>
            )}
          </div>

          {posts.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(targetPage) => {
                setPage(targetPage);
                window.scrollTo(0, 0);
              }}
            />
          )}
        </div>
      )}
    </div>
  )

}