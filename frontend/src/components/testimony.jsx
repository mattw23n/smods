import React, { useEffect } from "react";
import { animate, useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure"

const testimonials = [
    {
        pos: 1,
        text: "TESTIMONY 1.",
        author: "Jane Smith",
        title: "Highly Recommend",
    },
    {
        pos: 2,
        text: "TESTIMONY 2",
        author: "Alice Johnson",
        title: "Great Experience",
    },
    {
        pos: 3,
        text: "TESTIMONY 3",
        author: "Michael Scott",
        title: "Stayin' Alive",
    },
    {
        pos: 4,
        text: "TESTIMONY 4",
        author: "John Doe",
        title: "Awesome Service",
    },


];

const TestimonyCard = ({text, author}) => {
    // console.log(text)
    // console.log(author)

    return(
        <blockquote className="flex flex-col min-h-64 w-[400px] justify-between bg-white/70 rounded-3xl p-6 shadow-sm backdrop-blur-sm shadow-lg mx-2">
            <p className="mt-4 leading-relaxed font-archivo break-words whitespace-normal">{text}</p>
            <div className="mt-4 text-sm font-archivo font-bold">
                &mdash; {author}
            </div>
        </blockquote>
    )
}

const TestimonyCarousel = ({testimonials}) => {

    const xTranslation = useMotionValue(0);
    const cardWidth = 400 + 16; // Card width + gap
    const visibleCards = 3; // Number of cards visible at once
    const containerWidth = cardWidth * visibleCards;

    useEffect(() => {
        let controls

        controls = animate(xTranslation, [0, -containerWidth], {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
        })

        return controls.stop
    }, [xTranslation, containerWidth])

    return(
        <div className="overflow-hidden mx-auto" style={{ width: '100%', maxWidth: `${containerWidth}px` }}>
            <motion.div className="absolute left-0 flex gap-4" style={{ x: xTranslation}}>
                {[...testimonials, ...testimonials]
                    .map((card, index) => (
                        <TestimonyCard key={index} text={card.text} author={card.author}/>
                    ))}
            </motion.div>

        </div>

    )
}

export default TestimonyCarousel