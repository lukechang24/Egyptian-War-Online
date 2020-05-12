const cards = [
	{
		rank: "two",
		suit: "diamonds",
		imgUrl: "images/2oD.png",
		id: "#2oD"
	},
	{
		rank: "two",
		suit: "hearts",
		imgUrl: "images/2oH.png",
		id: "#2oH"
	},
	{
		rank: "two",
		suit: "clubs",
		imgUrl: "images/2oC.png",
		id: "#2oC"
	},
	{
		rank: "two",
		suit: "spades",
		imgUrl: "images/2oS.png",
		id: "#2oS"
	},
	{
		rank: "three",
		suit: "diamonds",
		imgUrl: "images/3oD.png",
		id: "#3oD"
	},
	{
		rank: "three",
		suit: "hearts",
		imgUrl: "images/3oH.png",
		id: "#3oH"
	},
	{
		rank: "three",
		suit: "clubs",
		imgUrl: "images/3oC.png",
		id: "#3oC"
	},
	{
		rank: "three",
		suit: "spades",
		imgUrl: "images/3oS.png",
		id: "#3oS"
	},
	{
		rank: "four",
		suit: "diamonds",
		imgUrl: "images/4oD.png",
		id: "#4oD"
	},
	{
		rank: "four",
		suit: "hearts",
		imgUrl: "images/4oH.png",
		id: "#4oH"
	},
	{
		rank: "four",
		suit: "clubs",
		imgUrl: "images/4oC.png",
		id: "#4oC"
	},
	{
		rank: "four",
		suit: "spades",
		imgUrl: "images/4oS.png",
		id: "#4oS"
	},
	{
		rank: "five",
		suit: "diamonds",
		imgUrl: "images/5oD.png",
		id: "#5oD"
	},
	{
		rank: "five",
		suit: "hearts",
		imgUrl: "images/5oH.png",
		id: "#5oH"
	},
	{
		rank: "five",
		suit: "clubs",
		imgUrl: "images/5oC.png",
		id: "#5oC"
	},
	{
		rank: "five",
		suit: "spades",
		imgUrl: "images/5oS.png",
		id: "#5oS"
	},
	{
		rank: "six",
		suit: "diamonds",
		imgUrl: "images/6oD.png",
		id: "#6oD"
	},
	{
		rank: "six",
		suit: "hearts",
		imgUrl: "images/6oH.png",
		id: "#6oH"
	},
	{
		rank: "six",
		suit: "clubs",
		imgUrl: "images/6oC.png",
		id: "#6oC"
	},
	{
		rank: "six",
		suit: "spades",
		imgUrl: "images/6oS.png",
		id: "#6oS"
	},
	{
		rank: "seven",
		suit: "diamonds",
		imgUrl: "images/7oD.png",
		id: "#7oD"
	},
	{
		rank: "seven",
		suit: "hearts",
		imgUrl: "images/7oH.png",
		id: "#7oH"
	},
	{
		rank: "seven",
		suit: "clubs",
		imgUrl: "images/7oC.png",
		id: "#7oC"
	},
	{
		rank: "seven",
		suit: "spades",
		imgUrl: "images/7oS.png",
		id: "#7oS"
	},
	{
		rank: "eight",
		suit: "diamonds",
		imgUrl: "images/8oD.png",
		id: "#8oD"
	},
	{
		rank: "eight",
		suit: "hearts",
		imgUrl: "images/8oH.png",
		id: "#8oH"
	},
	{
		rank: "eight",
		suit: "clubs",
		imgUrl: "images/8oC.png",
		id: "#8oC"
	},
	{
		rank: "eight",
		suit: "spades",
		imgUrl: "images/8oS.png",
		id: "#8oS"
	},
	{
		rank: "nine",
		suit: "diamonds",
		imgUrl: "images/9oD.png",
		id: "#9oD"
	},
	{
		rank: "nine",
		suit: "hearts",
		imgUrl: "images/9oH.png",
		id: "#9oH"
	},
	{
		rank: "nine",
		suit: "clubs",
		imgUrl: "images/9oC.png",
		id: "#9oC"
	},
	{
		rank: "nine",
		suit: "spades",
		imgUrl: "images/9oS.png",
		id: "#9oS"
	},
	{
		rank: "ten",
		suit: "diamonds",
		imgUrl: "images/10oD.png",
		id: "#10oD"
	},
	{
		rank: "ten",
		suit: "hearts",
		imgUrl: "images/10oH.png",
		id: "#10oH"
	},
	{
		rank: "ten",
		suit: "clubs",
		imgUrl: "images/10oC.png",
		id: "#10oC"
	},
	{
		rank: "ten",
		suit: "spades",
		imgUrl: "images/10oS.png",
		id: "#10oS"
	},
	{
		rank: "jack",
		suit: "diamonds",
		imgUrl: "images/JoD.png",
		id: "#JoD"
	},
	{
		rank: "jack",
		suit: "hearts",
		imgUrl: "images/JoH.png",
		id: "#JoH"
	},
	{
		rank: "jack",
		suit: "clubs",
		imgUrl: "images/JoC.png",
		id: "#JoC"
	},
	{
		rank: "jack",
		suit: "spades",
		imgUrl: "images/JoS.png",
		id: "#JoS"
	},
	{
		rank: "queen",
		suit: "diamonds",
		imgUrl: "images/QoD.png",
		id: "#QoD"
	},
	{
		rank: "queen",
		suit: "hearts",
		imgUrl: "images/QoH.png",
		id: "#QoH"
	},
	{
		rank: "queen",
		suit: "clubs",
		imgUrl: "images/QoC.png",
		id: "#QoC"
	},
	{
		rank: "queen",
		suit: "spades",
		imgUrl: "images/QoS.png",
		id: "#QoS"
	},
	{
		rank: "king",
		suit: "diamonds",
		imgUrl: "images/KoD.png",
		id: "#KoD"
	},
	{
		rank: "king",
		suit: "hearts",
		imgUrl: "images/KoH.png",
		id: "#KoH"
	},
	{
		rank: "king",
		suit: "clubs",
		imgUrl: "images/KoC.png",
		id: "#KoC"
	},
	{
		rank: "king",
		suit: "spades",
		imgUrl: "images/KoS.png",
		id: "#KoS"
	},
	{
		rank: "ace",
		suit: "diamonds",
		imgUrl: "images/AoD.png",
		id: "#AoD"
	},
	{
		rank: "ace",
		suit: "hearts",
		imgUrl: "images/AoH.png",
		id: "#AoH"
	},
	{
		rank: "ace",
		suit: "clubs",
		imgUrl: "images/AoC.png",
		id: "#AoC"
	},
	{
		rank: "ace",
		suit: "spades",
		imgUrl: "images/AoS.png",
		id: "#AoS"
	}
]

export default cards