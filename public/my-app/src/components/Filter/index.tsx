import React, { useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"
import { TypeFilter } from "../../types/filter"

interface IOptionFilter {
    value: string
    text: string
}

interface IFilterProps {
    getInfo(searchValue: string): void
    options: IOptionFilter[]
}

const Filter: React.FC<IFilterProps> = ({getInfo, options}) => {

    const { filterSelectValue, searchValue } = useTypedSelector(state => state.filter)
    const {actionChangeFilterInput, actionChangeFilterSelect} = useActions()
    const [searchTimeout, setSearchTimeout] = useState<any>(false)

    const handlerChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        actionChangeFilterInput(event.target.value)

        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }

        if (event.target.value != "") {
            setSearchTimeout(setTimeout(() => {
                getInfo(event.target.value)
            }, 1500))
        } else {
            getInfo("")
        }
    }

    const handlerChangeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        actionChangeFilterSelect(event.target.value as TypeFilter)
    }



    return (
        <div className="filter">
            <div className="form-group form-group--search">
                <input value={searchValue} onChange={(e) => handlerChangeSearchValue(e)} type="text" className="form-control" placeholder="Поиск..." />
            </div>
            <div>
                <div className="form-group form-group--select">
                    <select value={filterSelectValue} onChange={handlerChangeSelectValue} className="form-select">
                        {
                            options.map(option => {
                                return <option key={option.value} value={option.value}>{option.text}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter