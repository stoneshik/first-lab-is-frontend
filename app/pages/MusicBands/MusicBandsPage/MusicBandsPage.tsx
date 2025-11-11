import { AddSingleToBandForm } from "~/components/Forms/MusicBands/AddSingleToBandForm/AddSingleToBandForm";
import { DeleteOneByEstablishmentDateForm } from "~/components/Forms/MusicBands/DeleteOneByEstablishmentDateForm/DeleteOneByEstablishmentDateForm";
import { GetBandsAfterEstablishmentForm } from "~/components/Forms/MusicBands/GetBandsAfterEstablishmentForm/GetBandsAfterEstablishmentForm";
import { GetOneWithMinIdForm } from "~/components/Forms/MusicBands/GetOneWithMinIdForm/GetOneWithMinIdForm";
import { MusicBandCreateForm } from "~/components/Forms/MusicBands/MusicBandCreateForm/MusicBandCreateForm";
import styles from "./MusicBandsPage.module.scss";

export function MusicBandsPage() {
    return (
        <div className={styles.wrapper}>
            <MusicBandCreateForm />
            <DeleteOneByEstablishmentDateForm />
            <GetOneWithMinIdForm />
            <GetBandsAfterEstablishmentForm />
            <AddSingleToBandForm />
        </div>
    );
}
