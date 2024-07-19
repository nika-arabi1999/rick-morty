export default function EpisodesList({
  itemEpisodes,
  sort,
}: {
  itemEpisodes: any;
  sort: string;
}) {
  return (
    <ul className="ep-list">
      {Array.isArray(itemEpisodes) ? (
        itemEpisodes
          .sort((a: any, b: any) => {
            if (sort === "earliest") {
              return (
                new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
              );
            } else {
              return (
                new Date(b.air_date).getTime() - new Date(a.air_date).getTime()
              );
            }
          })
          .map((ep, index) => {
            return (
              <li className="ep-list-item" key={ep.name}>
                <span className="ep-title">{`${index + 1}-${ep.name}`}</span>
                <span className="ep-date"> {`${ep.air_date}`}</span>
              </li>
            );
          })
      ) : (
        <li className="ep-list-item">
          <span className="ep-title">
            {itemEpisodes.name ? `1-${itemEpisodes.name}` : ""}
          </span>
          <span className="ep-date">
            {" "}
            {itemEpisodes.air_date ? `${itemEpisodes.air_date}` : ""}
          </span>
        </li>
        // <span>"no episodes for this character!"</span>
      )}
    </ul>
  );
}
