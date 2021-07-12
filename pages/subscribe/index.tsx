import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { TiTick } from "react-icons/ti";
import Container from "../../components/container-padding";
import { SubsribeItem } from "../../components/card/subscribe-item";
import { ListCustomPrefix } from "../../components/list/list-custom-prefix";
import { ButtonJustifyBetween } from "../../components/button/button-justify-between";
import { subscribe } from "../../service/subscribe";

export const Subscribe = (): ReactElement => {
  console.log("🚀 ~ file: index.tsx ~ line 10 ~ Subscribe ~ Subscribe");
  const [errorMsgSubscribe, setErrorMsgSubscribe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubscribe = async (subscribePlan: string) => {
    try {
      setIsLoading(true);
      console.log();
      const key = localStorage.getItem("komika-key");
      if (key != "undefined") {
        localStorage.getItem("komika-key");
        const { msg, data } = await subscribe(subscribePlan);
        window.open(data.redirect_url);
      } else {
        router.push("/auth/signin");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsgSubscribe(error.message);
    }
  };
  return (
    <Container className="mt-24 min-h-screen">
      <p className="text-4xl font-medium leading-10 text-center text-blue-900">
        Mengapa kamu harus subscribe?
      </p>
      <p className="text-2xl leading-loose text-center text-gray-500">
        Karena dengan kamu subcribe kamu telah membantu kami agar tetap terus
        bekarya
      </p>
      <div className="grid grid-cols-3 gap-4">
        <SubsribeItem
          onClick={() => isLoading || handleSubscribe("weekly")}
          loading={isLoading}
          className="h-full"
          title="Satu Paham"
          price="29.900"
          until="Berlaku untuk 7 Hari"
          buttonText="Subscribe Harian"
          headBgColor="bg-gray-300"
        >
          <div className="mt-4">
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Keunggulan"
              content={[
                "Bebas baca artikel tanpa jeda",
                "Simpan artikel sampai dengan 10 artikel",
              ]}
            />
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Perlu tau"
              content={[
                "Paket ini berlaku untuk 7 hari",
                "Hanya dapat digunakan 1 device",
              ]}
            />
            <div className="mt-8">
              <ButtonJustifyBetween
                leftcontent="Cara pakai"
                rightIcon=">"
                onClick={() => null}
              />
              <ButtonJustifyBetween
                leftcontent="Syarat dan ketentuan"
                rightIcon=">"
                onClick={() => null}
              />
            </div>
          </div>
        </SubsribeItem>
        <SubsribeItem
          onClick={() => isLoading || handleSubscribe("monthly")}
          loading={isLoading}
          className="h-full"
          title="Satu Rasa"
          price="124.900"
          until="Berlaku untuk 1 Bulan"
          buttonText="Subscribe Bulanan"
          headBgColor="bg-primary"
        >
          <div className="mt-4">
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Keunggulan"
              content={[
                "Bebas baca artikel tanpa jeda",
                "Simpan artikel sampai dengan 10 artikel",
              ]}
            />
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Perlu tau"
              content={[
                "Paket ini berlaku untuk 30 hari",
                "Hanya dapat digunakan 1 device",
              ]}
            />
            <div className="mt-8">
              <ButtonJustifyBetween
                leftcontent="Cara pakai"
                rightIcon=">"
                onClick={() => null}
              />
              <ButtonJustifyBetween
                leftcontent="Syarat dan ketentuan"
                rightIcon=">"
                onClick={() => null}
              />
            </div>
          </div>
        </SubsribeItem>
        <SubsribeItem
          onClick={() => isLoading || handleSubscribe("yearly")}
          loading={isLoading}
          className="h-full"
          title="Satu Jiwa"
          price="1.499.900"
          until="Berlaku untuk 1 Tahun"
          buttonText="Subscribe Tahunan"
          headBgColor="bg-yellow-400"
        >
          <div className="mt-4">
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Keunggulan"
              content={[
                "Bebas baca artikel tanpa jeda",
                "Simpan artikel sampai dengan 10 artikel",
              ]}
            />
            <ListCustomPrefix
              prefixIcon={<TiTick className="inline" />}
              label="Perlu tau"
              content={[
                "Paket ini berlaku untuk 1 Tahun",
                "Hanya dapat digunakan 1 device",
              ]}
            />
            <div className="mt-8">
              <ButtonJustifyBetween
                leftcontent="Cara pakai"
                rightIcon=">"
                onClick={() => null}
              />
              <ButtonJustifyBetween
                leftcontent="Syarat dan ketentuan"
                rightIcon=">"
                onClick={() => null}
              />
            </div>
          </div>
        </SubsribeItem>
      </div>
    </Container>
  );
};
export default Subscribe;
