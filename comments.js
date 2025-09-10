export let comments = [
  /*
      {
        userName: "Глеб Фокин",
        date: "12.02.22 12:18",
        commentText: "Это будет первый комментарий на этой странице",
        likes: 3,
        isLiked: false
      },
      {
        userName: "Варвара Н.",
        date: "13.02.22 19:22",
        commentText: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
        isLiked: true
      }
        */
    ]

export const updateComments = (newComments) => {
    comments = newComments;
}