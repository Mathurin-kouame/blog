interface FeedToggleProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabsList: string[]
}


export const FeedToggle = ({ activeTab, onTabChange, tabsList }: FeedToggleProps) => {

  const handleOnTabChange = (tab: string) => {
    onTabChange(tab)
  }

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {
          tabsList.map((tab) => (
            <li key={tab} className="nav-item">
              <a className={tab === activeTab ? "nav-link active" : "nav-link"} onClick={() => handleOnTabChange(tab)}>{tab}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
