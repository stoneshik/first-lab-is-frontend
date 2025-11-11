import { MusicBandCreateForm } from "~/components/Forms/MusicBands/MusicBandCreateForm/MusicBandCreateForm";
import styles from "./MusicBandsPage.module.scss";

export function MusicBandsPage() {
    return (
        <div className={styles.wrapper}>
            <MusicBandCreateForm />
        </div>
    );
}
