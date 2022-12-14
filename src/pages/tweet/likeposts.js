
const likes = async () => {
    if (this.state.FavoriteBorder != 'white')
    const result = await fetch(`http://ferasjobeir.com/api/posts/like`, {
      method: "post",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        like: this.state.post_id
    })}).then(result => {
        this.setState({ likeIcon: 'red' })
    
    });
}
   

  export default 