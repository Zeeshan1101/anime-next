import { MediaStatus } from "@/__generated__/graphql";

export const ShowEpisodes = ({
    episodes,
    status,
    nextEpisode,
}: {
    episodes?: number | null;
    nextEpisode?: number | null;
    status: MediaStatus;
}) => {
    switch (status) {
        case MediaStatus.Finished:
            return <div>Finished - {episodes} Episodes</div>;
        case MediaStatus.Releasing:
            return <div>Releasing - {nextEpisode} Episodes</div>;
        case MediaStatus.NotYetReleased:
            return <div>Not Yet Released</div>;
        case MediaStatus.Cancelled:
            return <div>Cancelled</div>;
        default:
            return false;
    }

    // return (
    //     <div>
    //         {episodes} <span>Episodes</span>
    //     </div>
    // );
};
