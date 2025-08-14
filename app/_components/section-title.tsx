import React from "react"

interface SectionTitleProps {
  children: React.ReactNode
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
      {children}
    </h2>
  )
}

export default SectionTitle
