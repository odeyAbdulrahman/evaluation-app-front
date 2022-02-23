const getEmojes = () => {
  const emojes = [
    { id: 11, t_name: "Like", img:"/assets/images/a.png", status: true },
    { id: 22, t_name: "very_good",   img:"/assets/images/b.png",  status: true },
    { id: 33, t_name: "good", img:"/assets/images/c.png", status: true },
    { id: 44, t_name: "pissed_me", img: "/assets/images/d.png", status: false },
  ];
  return emojes;
};
export default getEmojes;
