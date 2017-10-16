var branches = []
class Branch {
  constructor(branch) {
    this.address = branch.address
    this.branch_code = branch.branch_code
    this.colour = branch.colour
    this.company_id = branch.company_id
    this.id = branch.id
    this.latlng = branch.latlng
    this.name = branch.name
    this.postcode = branch.postcode
    this.telephone = branch.telephone
    branches.push(this)
  }

  static getBranchByBranchCode(branch_code) {
    return branches.find(branch => {
      return branch.branch_code == branch_code
    })
  }
}

export default Branch
