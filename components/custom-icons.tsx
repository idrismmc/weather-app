import Image from "next/image"

export const AirQualityIcon = () => {
    return (
        <Image
            src="/icons/air-quality.png"
            alt="Air Quality"
            width={24}
            height={24}
            className="dark:invert invert-0"
            loading="lazy"
        />
    )
}
