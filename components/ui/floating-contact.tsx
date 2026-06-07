import Image from "next/image";

export function FloatingContact() {
    return (
        <div className="floatingContact" aria-label="Kênh liên hệ nhanh">
            <a className="floatingContactButton floatingContactButtonMessenger" href="#" aria-label="Demo liên hệ Messenger">
                <span aria-hidden="true">
                    <Image src="/icons/messenger_icon.jpg" alt="" width={34} height={34} />
                </span>
                <strong>Messenger</strong>
            </a>
            <a className="floatingContactButton floatingContactButtonZalo" href="#" aria-label="Demo liên hệ Zalo">
                <span aria-hidden="true">
                    <Image src="/icons/zalo_icon.png" alt="" width={34} height={34} />
                </span>
                <strong>Zalo</strong>
            </a>
        </div>
    );
}
