import { useTranslation } from "react-i18next"
import usePreconfigured from "auth/hooks/usePreconfigured"
import { Select } from "components/form"
import useAuth from "../../hooks/useAuth"
import { usePreconfigure } from "utils/localStorage"

const SelectPreconfigured = () => {
  const { t } = useTranslation()
  const { connectedWallet, connectPreconfigured } = useAuth()
  const { preconfigure } = usePreconfigure()
  const preconfigured = usePreconfigured()

  if (!preconfigure) return null

  const selected = preconfigured.find(
    ({ name }) => name === connectedWallet?.name
  )

  return (
    <Select
      value={selected?.name ?? ""}
      onChange={(e) => {
        const wallet = preconfigured.find(({ name }) => name === e.target.value)
        if (wallet) connectPreconfigured(wallet)
      }}
    >
      <option value="" disabled>
        {t("Preconfigured wallets...")}
      </option>

      {preconfigured.map(({ name }) => {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        )
      })}
    </Select>
  )
}

export default SelectPreconfigured
