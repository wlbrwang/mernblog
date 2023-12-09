export default function Post(){
    return(
        <div className="post">
        <div className="image">
          <img src="https://images.pexels.com/photos/586415/pexels-photo-586415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="img"/> 
        </div>
        <div className="texts">
          <h2>This is a title</h2>
          <p className="info">
            <a className="author">Wilbur Wang</a>
            <time>2023-12-07 23:00</time>
          </p>
          <p className="summary">this is a summary</p>
        </div>
      </div>
    )
}