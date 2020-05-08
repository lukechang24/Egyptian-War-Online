const cards = [
	{
		rank: "two",
		suit: "diamonds",
		imgUrl: "images/2D.png",
		id: "#2oD"
	},
	{
		rank: "two",
		suit: "hearts",
		imgUrl: "images/2H.png",
		id: "#2oH"
	},
	{
		rank: "two",
		suit: "clubs",
		imgUrl: "images/2C.png",
		id: "#2oC"
	},
	{
		rank: "two",
		suit: "spades",
		imgUrl: "images/2S.png",
		id: "#2oS"
	},
	{
		rank: "three",
		suit: "diamonds",
		imgUrl: "images/3D.png",
		id: "#3oD"
	},
	{
		rank: "three",
		suit: "hearts",
		imgUrl: "images/3H.png",
		id: "#3oH"
	},
	{
		rank: "three",
		suit: "clubs",
		imgUrl: "images/3C.png",
		id: "#3oC"
	},
	{
		rank: "three",
		suit: "spades",
		imgUrl: "images/3S.png",
		id: "#3oS"
	},
	{
		rank: "four",
		suit: "diamonds",
		imgUrl: "images/4D.png",
		id: "#4oD"
	},
	{
		rank: "four",
		suit: "hearts",
		imgUrl: "images/4H.png",
		id: "#4oH"
	},
	{
		rank: "four",
		suit: "clubs",
		imgUrl: "images/4C.png",
		id: "#4oC"
	},
	{
		rank: "four",
		suit: "spades",
		imgUrl: "images/4S.png",
		id: "#4oS"
	},
	{
		rank: "five",
		suit: "diamonds",
		imgUrl: "images/5D.png",
		id: "#5oD"
	},
	{
		rank: "five",
		suit: "hearts",
		imgUrl: "images/5H.png",
		id: "#5oH"
	},
	{
		rank: "five",
		suit: "clubs",
		imgUrl: "images/5C.png",
		id: "#5oC"
	},
	{
		rank: "five",
		suit: "spades",
		imgUrl: "images/5S.png",
		id: "#5oS"
	},
	{
		rank: "six",
		suit: "diamonds",
		imgUrl: "images/6D.png",
		id: "#6oD"
	},
	{
		rank: "six",
		suit: "hearts",
		imgUrl: "images/6H.png",
		id: "#6oH"
	},
	{
		rank: "six",
		suit: "clubs",
		imgUrl: "images/6C.png",
		id: "#6oC"
	},
	{
		rank: "six",
		suit: "spades",
		imgUrl: "images/6S.png",
		id: "#6oS"
	},
	{
		rank: "seven",
		suit: "diamonds",
		imgUrl: "images/7D.png",
		id: "#7oD"
	},
	{
		rank: "seven",
		suit: "hearts",
		imgUrl: "images/7H.png",
		id: "#7oH"
	},
	{
		rank: "seven",
		suit: "clubs",
		imgUrl: "images/7C.png",
		id: "#7oC"
	},
	{
		rank: "seven",
		suit: "spades",
		imgUrl: "images/7S.png",
		id: "#7oS"
	},
	{
		rank: "eight",
		suit: "diamonds",
		imgUrl: "images/8D.png",
		id: "#8oD"
	},
	{
		rank: "eight",
		suit: "hearts",
		imgUrl: "images/8H.png",
		id: "#8oH"
	},
	{
		rank: "eight",
		suit: "clubs",
		imgUrl: "images/8C.png",
		id: "#8oC"
	},
	{
		rank: "eight",
		suit: "spades",
		imgUrl: "images/8S.png",
		id: "#8oS"
	},
	{
		rank: "nine",
		suit: "diamonds",
		imgUrl: "images/9D.png",
		id: "#9oD"
	},
	{
		rank: "nine",
		suit: "hearts",
		imgUrl: "images/9H.png",
		id: "#9oH"
	},
	{
		rank: "nine",
		suit: "clubs",
		imgUrl: "images/9C.png",
		id: "#9oC"
	},
	{
		rank: "nine",
		suit: "spades",
		imgUrl: "images/9S.png",
		id: "#9oS"
	},
	{
		rank: "ten",
		suit: "diamonds",
		imgUrl: "images/10D.png",
		id: "#10oD"
	},
	{
		rank: "ten",
		suit: "hearts",
		imgUrl: "images/10H.png",
		id: "#10oH"
	},
	{
		rank: "ten",
		suit: "clubs",
		imgUrl: "images/10C.png",
		id: "#10oC"
	},
	{
		rank: "ten",
		suit: "spades",
		imgUrl: "images/10S.png",
		id: "#10oS"
	},
	{
		rank: "jack",
		suit: "diamonds",
		imgUrl: "images/JD.png",
		id: "#JoD"
	},
	{
		rank: "jack",
		suit: "hearts",
		imgUrl: "images/JH.png",
		id: "#JoH"
	},
	{
		rank: "jack",
		suit: "clubs",
		imgUrl: "images/JC.png",
		id: "#JoC"
	},
	{
		rank: "jack",
		suit: "spades",
		imgUrl: "images/JS.png",
		id: "#JoS"
	},
	{
		rank: "queen",
		suit: "diamonds",
		imgUrl: "images/QD.png",
		id: "#QoD"
	},
	{
		rank: "queen",
		suit: "hearts",
		imgUrl: "images/QH.png",
		id: "#QoH"
	},
	{
		rank: "queen",
		suit: "clubs",
		imgUrl: "images/QC.png",
		id: "#QoC"
	},
	{
		rank: "queen",
		suit: "spades",
		imgUrl: "images/QS.png",
		id: "#QoS"
	},
	{
		rank: "king",
		suit: "diamonds",
		imgUrl: "images/KD.png",
		id: "#KoD"
	},
	{
		rank: "king",
		suit: "hearts",
		imgUrl: "images/KH.png",
		id: "#KoH"
	},
	{
		rank: "king",
		suit: "clubs",
		imgUrl: "images/KC.png",
		id: "#KoC"
	},
	{
		rank: "king",
		suit: "spades",
		imgUrl: "images/KS.png",
		id: "#KoS"
	},
	{
		rank: "ace",
		suit: "diamonds",
		imgUrl: "images/AD.png",
		id: "#AoD"
	},
	{
		rank: "ace",
		suit: "hearts",
		imgUrl: "images/AH.png",
		id: "#AoH"
	},
	{
		rank: "ace",
		suit: "clubs",
		imgUrl: "images/AC.png",
		id: "#AoC"
	},
	{
		rank: "ace",
		suit: "spades",
		imgUrl: "images/AS.png",
		id: "#AoS"
	}
]

export default cards