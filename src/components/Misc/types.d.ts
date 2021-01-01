export interface Parts {
    cpu: string,
    gpu: string,
    ram: string,
    mobo: string,
    storage: string,
    cooling: string,
    psu: string,
    extra: string,
    case: string
}

export interface Build {
    name: string,
    type: string,
    price: string,
    desc1: string,
    desc2: string,
    parts: Parts
}

export interface Part {
    name: string,
    price: string,
    brand: string,
    image: string,
    link?: string,
}