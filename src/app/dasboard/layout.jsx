import Sidebar from '@/components/layout/Sidebar'
import RightProfileSidebar from '@/components/rightbar/RightProfileSidebar'
import React from 'react'

const layout = ({ children }) => {
  
  return (
    <div className="bg-[#F7F6FE] ">
        <main>
            <Sidebar />
            <RightProfileSidebar/>
            <div className="pr-26">
              {children}
            </div>
        </main>
    </div>
 
  )
}

export default layout